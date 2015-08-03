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
          self.set('subcategories', data);
        });
    },
  chooseSubCategory: function(value, component) {
      this.set('sub_category', value);
      var self = this;
      Ember.$.getJSON('http://localhost:8000/api/categories/' + value+'/').then(function(data) {
          self.set('subsubcategories', data);
        });
    },
    chooseSubSubCategory: function(value, component) {
      this.set('model.categories', value);
      
    }
  },
  
  init: function() {
          
      var self = this;
    Ember.$.getJSON('http://localhost:8000/api/categories/').then(function(data) {
          self.set('categories', data);
        });
  }
});
