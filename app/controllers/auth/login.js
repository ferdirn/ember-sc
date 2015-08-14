import Ember from 'ember';

export default Ember.Controller.extend({
  errors: {},
  isUsernameError: false,
  isPasswordError: false,
  usernameErrorMessage: '',
  passwordErrorMessage: '',
  actions: {
    authenticate: function() {
      this.set('isUsernameError', false);
      this.set('isPasswordError', false);
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'simple-auth-authenticator:jwt';

      this.get('session').authenticate(authenticator, credentials);
    }
  }
});
