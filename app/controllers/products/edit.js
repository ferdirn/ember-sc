import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var data = this.get('model');
      data.save();
    },
  chooseCategory: function(value, component) {
      this.set('parent_category', value);
      var self = this;
      Ember.$.getJSON('http://localhost:8000/api/categories/' + value+'/').then(function(data) {
          self.set('model.d_categories.2', data);
        });
    },
  chooseSubCategory: function(value, component) {
      this.set('sub_category', value);
      var self = this;
      Ember.$.getJSON('http://localhost:8000/api/categories/' + value+'/').then(function(data) {
          self.set('model.d_categories.3', data);
        });
    },
    chooseSubSubCategory: function(value, component) {
      this.set('model.categories', value);
      
    }
  }
});
