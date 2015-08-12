import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var data = this.get('model');
      delete data.d_categories;
      delete data.subcategory;

      var self = this;
      data.save().then(function() {
        self.transitionToRoute('products.detail', data.id);
      });
    },
    chooseCategory: function(value, component) {
      this.set('sub_category', value);
      var self = this;
      this.set('model.d_categories.3', null);
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
          self.set('model.d_categories.2', data);
        });
    },
    chooseSubCategory: function(value, component) {
      this.set('sub_category', value);
      var self = this;
      Ember.$.getJSON(config.APP.API_HOST + '/api/categories/' + value+'/').then(function(data) {
          self.set('model.d_categories.3', data);
        });
    },
    chooseSubSubCategory: function(value, component) {
      this.set('model.categories', value);

    },
    selectPicture: function(value, component) {
      var self = this;
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
            //self.set('edit', false); 

        };
      //}
    }
  }
});
