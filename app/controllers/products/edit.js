import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  hasLevel2Category: false,
  hasLevel3Category: false,
  isEmptyParentCategory: false,
  isEmptySubCategory: false,
  isEmptyCategory: false,
  isSpecialEmptyMessage:false,
  isSpecialPriceEmpty:false,
  isSpecialCostEmpty:false,
  errorMessageSpecial: null,

  actions: {
    save: function() {
      var data = this.get('model');
      delete data.d_categories;

      if (data.get('product_sku') === null) {
        data.set('product_sku', '');
      }

      var parentCategory = data.get('parentcategory');
      var subCategory = data.get('subcategory');
      var category = data.get('categories');

      var hasLevel2Category = this.get('hasLevel2Category');
      var hasLevel3Category = this.get('hasLevel3Category');

      if (typeof parentCategory === 'undefined') {
        this.set('isEmptyParentCategory', true);
        return false;
      }

      if (hasLevel2Category && typeof subCategory === 'undefined') {
        this.set('isEmptySubCategory', true);
        return false;
      }

      if (hasLevel3Category && typeof category === 'undefined') {
        this.set('isEmptyCategory', true);
        return false;
      }

      if (!hasLevel3Category) {
        data.set('categories', 0);
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
      });
    },
    chooseCategory: function(value) {
      if (typeof value === 'undefined') {
        this.set('hasLevel2Category', false);
        this.set('hasLevel3Category', false);
        return false;
      }
      this.set('parent_category', value);
      this.set('isEmptyParentCategory', false);

      var model = this.get('model');
      model.set('subcategory', undefined);
      model.set('categories', undefined);

      var self = this;
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value + '/').then(function(data) {
        if (data.length > 0) {
          self.set('hasLevel2Category', true);
          self.set('hasLevel3Category', false);
          self.set('model.d_categories.2', data);
          self.set('subcategories', data);
        } else {
          self.set('hasLevel2Category', false);
          self.set('hasLevel3Category', false);
        }
      });
    },
    chooseSubCategory: function(value) {
      if (typeof value === 'undefined') {
        this.set('hasLevel3Category', false);
        return false;
      }
      this.set('sub_category', value);
      this.set('isEmptySubCategory', false);

      var model = this.get('model');
      model.set('categories', undefined);

      var self = this;
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value + '/').then(function(data) {
        if (data.length > 0) {
          self.set('hasLevel3Category', true);
          self.set('subsubcategories', data);
          self.set('model.d_categories.3', data);
        } else {
          self.set('hasLevel3Category', false);
        }
      });
    },
    chooseSubSubCategory: function(value) {
      var self = this;
      this.set('model.categories', value);
      var seller_price = this.get('seller_price');
      Ember.$.getJSON(config.APP.API_HOST + '/api/product/price-commission/', {'category': value}).then(function(data) {
        self.set('discount_percentage', data.commission_percentage);
        seller_price = Ember.$('#price').val() - (Ember.$('#price').val() * (data.commission_percentage/100));
        self.set('seller_price', seller_price);
      });
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
      var productId = this.get('model.id');
      

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
        self.transitionToRoute('products.detail', saveSpeciaPrice.id);
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

  }
});
