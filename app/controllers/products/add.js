import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  discount_percentage: 0,
  seller_price: 0,
  displayNameHelper: 'none',
  hasLevel2Category: false,
  hasLevel3Category: false,
  isEmptyParentCategory: false,
  isEmptySubCategory: false,
  isEmptyCategory: false,
  isEmptyShopName: false,
  isEmptyImage: false,
  actions: {
    focus: function() {
      this.set('displayNameHelper', 'block');
    },
    save: function() {
      var self = this;
      var data = this.get('model');

      if (data.get('category') === undefined) {
        this.set('isEmptyCategory', true);
        return false;
      } else {
        this.set('isEmptyCategory', false);
      }

      if (data.get('images') === undefined) {
        this.set('isEmptyImage', true);
        return false;
      } else {
        this.set('isEmptyImage', false);
      }

      data.set('product_attribute_set', '4');

      data.save().then(function(data) {
        self.transitionToRoute('products.detail', data.id);
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
            model.set('category', value);
            Ember.$.getJSON(
              config.APP.API_HOST + '/api/product/price-commission/', {'category': value}
            ).then(function(data) {
              self.set('discount_percentage', data.commission_percentage);
              if (model.get('price') === undefined) {
                self.set('seller_price', 0);
              } else {
                var seller_price = model.get('price') - (model.get('price') * (data.commission_percentage/100));
                self.set('seller_price', seller_price);
              }
            });
          }
        });
      }
      this.set('isEmptyCategory', false);
    },
    chooseCategory: function(value) {
      var self = this;

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

      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value + '/').then(function(data) {
        if (data.length > 0) {
          self.set('hasLevel2Category', true);
          self.set('hasLevel3Category', false);
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
        } else {
          self.set('hasLevel3Category', false);
        }
      });
    },
    chooseSubSubCategory: function(value) {
      var self = this;
      this.set('model.categories', value);
      this.set('isEmptyCategory', false);
      var seller_price = this.get('seller_price');
      Ember.$.getJSON(config.APP.API_HOST + '/api/product/price-commission/', {'category': value}).then(function(data) {
        self.set('discount_percentage', data.commission_percentage);
        seller_price = Ember.$('#price').val() - (Ember.$('#price').val() * (data.commission_percentage/100));
        self.set('seller_price', seller_price);
      });
    },
    priceCommission: function() {
      var discount_percentage = this.get('discount_percentage');
      var seller_price = this.get('seller_price');

      seller_price = Ember.$('#price').val() - (Ember.$('#price').val() * (discount_percentage/100));
      this.set('model.price', Ember.$('#price').val());
      this.set('seller_price', seller_price);
    },
    checkStatus: function(value){
      this.set('model.status', value);
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

    // Check if shop_name has already filled in
    this.store.find('profile').then(function(data) {
      var profile_model = data.get('firstObject');
      var shop_name = profile_model.get('shop_name');
      if (shop_name === '') {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', true);
      } else {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', false);
      }
    });

    var seller_price = 0;
    var discount_percentage = 0;

    Ember.$.getJSON(config.APP.API_HOST + '/api/categories/').then(function(data) {
      self.set('level1Categories', data);
    });
    this.set('seller_price', seller_price);
    this.set('discount_percentage', discount_percentage);

  }
});
