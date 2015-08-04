import Ember from 'ember';

export default Ember.Controller.extend({
  canSubmit: true,
  isPasswordNotMatch: false,

  actions: {
    matchPassword: function() {
      var model = this.get('model');
      var repassword = this.get('repassword');

      if (model.password !== '') {
        if (repassword !== model.password) {
          this.set('isPasswordNotMatch', true);
          this.set('canSubmit', false);
        } else {
          this.set('isPasswordNotMatch', false);
        }
      }
    },

    submit: function() {
      Ember.Logger.log('submit');
    }
  }

});
