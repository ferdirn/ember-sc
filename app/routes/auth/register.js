import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),
  setupController: function(controller) {
    controller.set('country', 'ID');
    // controller.set('partnership_type', '1');
  }
});
