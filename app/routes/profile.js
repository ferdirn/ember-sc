import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function() {
    return this.store.find('profile').then(function(result) {
      return result.get('firstObject');
    });
  },
  setupController: function(controller, model) {
      controller.set('model', model);
      controller.set('displaySaveSuccess', false);
  }
});
