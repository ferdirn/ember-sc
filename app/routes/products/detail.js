import Ember from 'ember';

export default Ember.Route.extend({
    
  model: function(params, transition) {
      return this.get('store').find('product', params.id);
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
});
