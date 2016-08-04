import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init() {
    this._super();
    var store = this.get('store');
    var top_level_categories = store.findAll('category');
    this.set('top_level_categories', top_level_categories);
    var edit_mode = this.get('product.category');
    var category_tree = Ember.A();
    var selected_categories = Ember.A();

    if (edit_mode) {
    } else {
      category_tree.pushObject(top_level_categories);
    }
    this.set('category_tree', category_tree);
    this.set('selected_categories', selected_categories);
  },
  actions: {
    updateChildren: function(value, component) {
      var self = this;
      var store = this.get('store');
      var index = component.get('data-level');
      var selected_categories = this.get('selected_categories');
      var remaining = selected_categories.length - index;

      if (remaining > 0) {
        selected_categories.removeAt(index, remaining);

        try {
          self.get('category_tree').removeAt(index+1, remaining);
        } catch(err) {}
      }

      var process_children = function(data) {
        if (data.isLoaded) {
          selected_categories.pushObject(value);

          if (data.get('length') > 0) {
            self.get('category_tree').pushObject(data);

          } else {
            // finalize data, send to parent model
            // console.log(self.get('category_tree'));
            // console.log(self.get('selected_categories'));
          }
        }
      };
      store.query('category', {parent: value}).then(process_children);

    }
  }
});
