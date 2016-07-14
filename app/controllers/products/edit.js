import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  discount_percentage: 0,
  seller_price: 0,
  hasLevel2Category: false,
  hasLevel3Category: false,
  isEmptyParentCategory: false,
  isEmptySubCategory: false,
  isEmptyCategory: false,
  isSpecialEmptyMessage:false,
  isSpecialPriceEmpty:false,
  isSpecialCostEmpty:false,
  errorMessageSpecial: null,
  errorMsg: '',
  isErrorName: false,
  isErrorUpcCode: false,

  actions: {
    save: function() {
      Ember.Logger.log('Entering product edit save');

      var data = this.get('model');
      delete data.d_categories;

      if (data.get('category') === undefined) {
        this.set('isEmptyCategory', true);
        return false;
      } else {
        this.set('isEmptyCategory', false);
      }

      if (data.get('product_sku') === null) {
        data.set('product_sku', '');
      }

      // if (data.get('special_price') === '') {
      //   data.set('special_price', 0);
      // }

      // if (data.get('special_from_date') === '') {
      //   data.set('special_from_date', null);
      // }

      // if (data.get('special_to_date') === '') {
      //   data.set('special_to_date', null);
      // }

      var self = this;
      data.save().then(function(data) {
        self.transitionToRoute('products.detail', data.id);
      }).catch(function(reason) {
        var detail = reason.errors[0].detail;
        self.set('errorMsg', detail.msg);
        if (detail.type === 'name') {
          self.set('isErrorName', true);
          self.set('isErrorUpcCode', false);
          Ember.$('#name').focus();
        }
        if (detail.type === 'upc_code') {
          self.set('isErrorUpcCode', true);
          self.set('isErrorName', false);
          Ember.$('#upc_code').focus();
        }
      });
    },
    hideCategories: function(value) {
      for (var i=value; i < this.get('categoryLevels'); i++) {
        var j = i + 1;
        this.set('hasLevel' + j + 'Category', false);
      }
    },
    chooseLevelCategory: function(value, component) {
      // Ember.Logger.log(value );
      // Ember.Logger.log(component.attrs.id);
      var id = component.attrs.id;
      var number = parseInt(id.substring(8));
      // Ember.Logger.log(number);
      var self = this;
      var next_number = number + 1;
      this.send('hideCategories', number);
      var model = self.get('model');
      if (value === 0 || value === undefined) {
        model.set('category', undefined);
      } else {
        Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value + '/').then(function(data) {
          if (data.length > 0) {
            self.set('level' + next_number + 'Categories', data);
            self.set('category' + next_number, 0);
            self.set('hasLevel' + next_number + 'Category', true);
            model.set('category', undefined);
          } else {
            // Check for commission percentage
            Ember.$.getJSON(
              config.APP.API_HOST + '/api/product/price-commission/', {'category': value}
            ).then(function(data) {
              if (data.commission_percentage === null || data.commission_percentage === 0) {
                self.set('category' + number, 0);
                model.set('category', undefined);
                alert('This category can not be used because commission percentage is empty. Please contact seller center admin.');
                return false;
              }
              self.set('discount_percentage', data.commission_percentage);
              if (model.get('price') === undefined) {
                self.set('seller_price', 0);
              } else {
                var seller_price = model.get('price') - (model.get('price') * (data.commission_percentage/100));
                self.set('seller_price', seller_price);
              }
              // Set the category
              model.set('category', value);
            });
          }
        });
      }
      this.set('isEmptyCategory', false);
    },
    priceCommission: function() {
      var discount_percentage = this.get('discount_percentage');
      var seller_price = this.get('seller_price');

      seller_price = Ember.$('#price').val() - (Ember.$('#price').val() * (discount_percentage/100));
      this.set('model.price', Ember.$('#price').val());
      this.set('seller_price', seller_price);

    },
    deleteImage: function() {
    },
    confirmSpecial: function(){

      this.set('isSpecialEmptyMessage', false);

      var specialPrice = this.get('model.special_price');
      var specialCost = this.get('model.special_cost');
      var specialFromDate = this.get('model.special_from_date');
      var specialToDate = this.get('model.special_to_date');
      var d1 = Date.parse(specialFromDate);
      var d2 = Date.parse(specialToDate);

      if (d1 > d2) {
          Ember.$('.bs-example-modal-lg').modal('hide');
          this.set('errorMessageSpecial', 'You cannot choose previous date as end date.');
          this.set('isSpecialEmptyMessage', true);
          return false;
      }

      if (specialPrice === undefined || specialPrice === '') {

        Ember.$('.bs-example-modal-lg').modal('hide');
        this.set('errorMessageSpecial', 'Special Price cannot be empty.');
        this.set('isSpecialEmptyMessage', true);
        return false;

      } else {

        this.set('isSpecialEmptyMessage', false);
      }

      if (specialCost === undefined || specialCost === '') {

        Ember.$('.bs-example-modal-lg').modal('hide');
        this.set('errorMessageSpecial', 'Special Cost cannot be empty.');
        this.set('isSpecialEmptyMessage', true);
        return false;

      } else {

        this.set('isSpecialEmptyMessage', false);
      }

      if (specialFromDate === undefined || specialFromDate === '') {

        Ember.$('.bs-example-modal-lg').modal('hide');
        this.set('errorMessageSpecial', 'Date Start cannot be empty.');
        this.set('isSpecialEmptyMessage', true);
        return false;

      } else {

        this.set('isSpecialEmptyMessage', false);
      }

      if (specialToDate === undefined || specialToDate === '') {

        Ember.$('.bs-example-modal-lg').modal('hide');
        this.set('errorMessageSpecial', 'Date End cannot be empty.');
        this.set('isSpecialEmptyMessage', true);
        return false;

      } else {

        this.set('isSpecialEmptyMessage', false);
      }

      Ember.$('.bs-example-modal-lg').modal('toggle');

    },
    checkStatus: function(value){
      this.set('model.status', value);
    },
    processSpecialPrice: function(){
      var productId = this.get('model.id');
      var specialPrice = this.get('model.special_price');
      var specialCost = this.get('model.special_cost');
      var specialFromDate = this.get('model.special_from_date');
      var specialToDate = this.get('model.special_to_date');
      var self = this;

      var saveSpeciaPrice =  this.store.createRecord('special-price', {
        product_id: productId,
        special_price: specialPrice,
        special_cost: specialCost,
        special_from_date: specialFromDate,
        special_to_date: specialToDate
      });

      function onSuccess(){
        Ember.$('.modal-backdrop').hide('fast');
        self.transitionToRoute('products.detail', productId);
      }

      function onFailed(){
        self.set('errorMessageSpecial', 'Server is busy, please try again in few minutes.');
        self.set('isSpecialEmptyMessage', true);
      }

      saveSpeciaPrice.save().then(onSuccess, onFailed);
    },
    selectPicture: function() {
      var model = this.get('model');
      var file = document.getElementById('files').files[0];
      var picReader = new FileReader();
      var self = this;
      var images = model.get('images');

      if (images == null) {
        images = [];
      }
      picReader.readAsDataURL(file);
      picReader.onload = function() {
        images.addObject({
          'name': file.name,
          'type': file.type,
          'file': picReader.result
        });
        self.set('model.images', images);

        if (images.length === 1) {
          self.set('model.image', images.get('firstObject'));
          self.set('model.primaryImage', images.get('firstObject'));
        }
      };
    },
    imagePreviewMouseEnter: function(value) {
      this.set('model.image', value);
    },
    imagePreviewMouseLeave: function() {
      this.set('model.image', this.get('model.primaryImage'));
    }
  },
  init: function() {
    var self = this;
    Ember.$.getJSON(config.APP.API_HOST + '/api/categories/').then(function(data) {
      self.set('level1Categories', data);
    });
  }
});
