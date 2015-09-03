import Ember from 'ember';

export default Ember.Route.extend({
  perPage: 10,
  model: function() {
    return this.store.findAll('message');
    // this.findPaged('product', params);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
