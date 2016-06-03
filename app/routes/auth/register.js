import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  setupController: function(controller) {
    controller.set('country', 'ID');
    // controller.set('partnership_type', '1');
  }
});
