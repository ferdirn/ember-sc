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
      this.set('parent_category', value);
      this.set('isEmptyParentCategory', false);
      var self = this;
      this.set('subsubcategories', null);
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
        if (data.length > 0) {
          self.set('hasLevel2Category', true);
          self.set('subcategories', data);
        } else {
          self.set('hasLevel2Category', false);
        }
      });
    },
    chooseSubCategory: function(value, component) {
      this.set('sub_category', value);
      this.set('isEmptySubCategory', false);
      var self = this;
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
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
    selectPicture: function(value, component) {
      var model = this.get('model');
      var file = document.getElementById('files').files[0];
      var picReader = new FileReader();
      var output = document.getElementById("result");
      var product_images = document.getElementById('product_images');
      var self = this;
      //if (file.type.search('image')) {
        picReader.readAsDataURL(file);
        picReader.onload = function() {
        //var content = "<span class='frame-thumbnail'><input class='btn btn-primary set-primary' type='button' value='Set as Primary'><img class='thumbnail-upload' src='" + picReader.result + "'" + "title='" + file.name + "' width='120' height='120'/><span class='fa fa-close bt-delete' {{action 'deleteImage'}}></span></span>";
        var content = "<span class='frame-thumbnail'><img class='thumbnail-upload' src='" + picReader.result + "'" + "title='" + file.name + "' width='120' height='120'/></span>";
            //console.log(Ember.Handlebars.compile(content));
            var div2 = document.createElement("span");
            div2.className = 'col-lg-3 col-md-3 allspacer4 text-center';
            div2.innerHTML = "<img class='live-thumb' width='28' height='28' src='" + picReader.result + "'" + "title='" + file.name + "'/><input type='hidden' name='images' value='" + picReader.result +"'/>";
            product_images.insertBefore(div2,null);
            $("#result").append(content);

            var images = model.get('images')
            if (images != null) {
              images.push({
                'name': file.name,
                'type': file.type,
                'file': picReader.result
              });
            } else {
              images = [{
                'name': file.name,
                'type': file.type,
                'file': picReader.result
              }];
            }
            model.set('images', images);
            self.set('model', model);

            console.log(model);

            console.log(model.get('images'));
          };
      //}
      console.log(model.images);
    }

  },

  init: function() {
    var self = this;
    Ember.$.getJSON(config.APP.API_HOST + '/api/categories/').then(function(data) {
      self.set('categories', data);
    });
  }
});
