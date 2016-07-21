import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function(params) {
    // if ember already has a record, we don't need to load it
    // from API again
    var m;
    var self = this;
    var stored = this.store.recordIsLoaded('product', params.id);

    var notFound = function() {
      self.transitionTo('/not-found');
    };

    if (stored) {
      m = this.store.peekRecord('product', params.id);
    } else {
      m = this.get('store').findRecord('product', params.id).catch(notFound);
    }
    return m;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
