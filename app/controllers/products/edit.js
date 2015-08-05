import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var data = this.get('model');
      delete data.d_categories;
      delete data.subcategory;
      console.log(data);
      data.save();
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
      
    }
  }
});
