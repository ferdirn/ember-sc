import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var data = this.get('model');
      var self = this;
      data.save().then(function() {
        self.transitionToRoute('products.detail', data.id);
      });
    },
  chooseCategory: function(value, component) {
      this.set('parent_category', value);
      var self = this;
      this.set('subsubcategories', null);
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
          self.set('subcategories', data);
        });
    },
  chooseSubCategory: function(value, component) {
      this.set('sub_category', value);
      var self = this;
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
          self.set('subsubcategories', data);
        });
    },
    chooseSubSubCategory: function(value, component) {
      this.set('model.categories', value);

    },
    selectPicture: function(value, component) {
      var model = this.get('model');
      var file = document.getElementById('files').files[0];
      var picReader = new FileReader();
      var output = document.getElementById("result");
      //if (file.type.search('image')) {
        picReader.readAsDataURL(file);
        picReader.onload = function() {
        $("#result").before("<img class='thumbnail-upload' src='" + picReader.result + "'" + "title='" + file.name + "' width='120' height='120'/>");
          
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

            console.log(model.get('images'));
        };
      //}
    }

  },

  init: function() {
      var self = this;
    Ember.$.getJSON(config.APP.API_HOST + '/api/categories/').then(function(data) {
          self.set('categories', data);
        });
  }
});
