import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
      this.render('products.add-edit');
  },
  model: function(params, transition) {
      return this.get('store').find('product', params.id);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('edit', true);
    console.log(model.categories[0]);
  }
});
