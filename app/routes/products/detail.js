import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
      var self = this;
      return this.get('store').find('product', params.id).then(function() {}, function() {
        self.transitionTo('/not-found');
      });
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
});
