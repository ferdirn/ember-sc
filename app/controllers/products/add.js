import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  displayNameHelper: 'none',
  hasLevel2Category: false,
  hasLevel3Category: false,
  isEmptyParentCategory: false,
  isEmptySubCategory: false,
  isEmptyCategory: false,
  actions: {
    focus: function() {
      this.set('displayNameHelper', 'block');
    },
    save: function() {
      var data = this.get('model');
      data.set('product_attribute_set', '4');

      var parentCategory = data.get('parentcategory');
      var subCategory = data.get('subcategory');
      var category = data.get('categories');

      if (typeof parentCategory === 'undefined') {
        this.set('isEmptyParentCategory', true);
        return false;
      }

      if (this.get('hasLevel2Category') && typeof subCategory === 'undefined') {
        this.set('isEmptySubCategory', true);
        return false;
      }

      if (this.get('hasLevel3Category') && typeof category === 'undefined') {
        this.set('isEmptyCategory', true);
        return false;
      }

      var self = this;
      data.save().then(function(data) {
        self.transitionToRoute('products.detail', data.id);
      });
    },
    chooseCategory: function(value, component) {
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
          self.set('subcategories', data);
        } else {
          self.set('hasLevel2Category', false);
          self.set('hasLevel3Category', false);
        }
      });
    },
    chooseSubCategory: function(value, component) {
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
    chooseSubSubCategory: function(value, component) {
      this.set('model.categories', value);
      this.set('isEmptyCategory', false);
    },
    priceCommission: function(value, component) {
        var self = this;
        var model = this.get('model');
        Ember.$.getJSON(config.APP.API_HOST + '/api/product/price-commission/', {'category': model.get('categories'), 'price': $('#price').val()}).then(function(data) {
          self.set('price_commission', data);
        });
        this.set('model.price', $('#price').val());

    },
    selectPicture: function(value, component) {
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
      Ember.Logger.log('imagePreviewMouseEnter');
      Ember.Logger.log(value);

      var model = this.get('model');
      model.set('image', value);
    },
    imagePreviewMouseLeave: function() {
      Ember.Logger.log('imagePreviewMouseLeave');

      var model = this.get('model');
      model.set('image', model.get('primaryImage'));
    }
  },

  init: function() {
    var self = this;
    Ember.$.getJSON(config.APP.API_HOST + '/api/categories/').then(function(data) {
      self.set('categories', data);
    });
  }
});
