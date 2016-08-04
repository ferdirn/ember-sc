import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),
  setupController: function(controller) {
    controller.set('message', '');
  },
  actions: {
    sessionAuthenticationFailed: function(errors) {
      var controller = this.controllerFor('auth.login');
      var errorMessage = errors.detail;

      if (errorMessage.search('username') > 0) {
        controller.set('isUsernameError', true);
        controller.set('usernameErrorMessage', errorMessage);
      } else {
        controller.set('isPasswordError', true);
        controller.set('passwordErrorMessage', errorMessage);
      }

      _.each(errors, function(val, key) {
        controller.set('errors.'+key, val);
      });
    }
  }
});
