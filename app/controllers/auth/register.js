import Ember from 'ember';

export default Ember.Controller.extend({

  isPasswordNotMatch: false,

  actions: {
    matchPassword: function() {
      var password = this.get('password');
      var repassword = this.get('repassword');

      if (password !== '') {
        if (repassword !== password) {
          this.set('isPasswordNotMatch', true);
        } else {
          this.set('isPasswordNotMatch', false);
        }
      }
    },

    submit: function() {
      var isPasswordNotMatch = this.get('isPasswordNotMatch');

      if (isPasswordNotMatch) {
        return false;
      }

      var email = this.get('email');
      var password = this.get('password');
      var username = this.get('username');
      var phone_number = this.get('phone_number');
      var first_name = this.get('first_name');
      var last_name = this.get('last_name');
      var shop_name = this.get('shop_name');
      var shop_address = this.get('shop_address');
      var return_address = this.get('return_address');

      var registration = this.store.createRecord('registration', {
        email: email,
        password: password,
        username: username,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        shop_name: shop_name,
        shop_address: shop_address,
        return_address: return_address
      });

      var self = this;

      registration.save().then(function(result) {
        Ember.Logger.log(result);
        self.transitionToRoute('auth.login').then(function(newRoute) {
          newRoute.controller.set('message', 'Congratulations! You have successfully registered with Moxy Seller Center<br>');
        });
      }).catch(function(reason) {
        if (reason.message !== undefined) {
          alert(reason.message);
        } else {
          alert(reason.responseJSON.detail);
        }
      });
    }
  }

});
