import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
      /*
      var self = this;
      return this.get('store').find('product', params.id).then(function(data) {
        return data;
      }, function() {
        self.transitionTo('/not-found');
      });
      */
     return this.get('store').find('product', params.id); 
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
});
