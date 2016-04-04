import Ember from 'ember';

export default Ember.Controller.extend({

  isPasswordNotMatch: false,
  countries: [
    {
      'code': 'ID',
      'name': 'Indonesia',
      'phone_code': '+62'
    },
    {
      'code': 'TH',
      'name': 'Thailand',
      'phone_code': '+66'
    }
  ],
  phone_code: '+62',

  usernameChanged: function() {
    var username = this.get('username');
    username = username.replace(/[^\w\s\-\.]/gi, "");
    username = username.replace(" ", "-");
    this.set('username', username);
  }.observes('username'),

  actions: {
    changeCountry: function() {
      var country_code = this.get('country');
      var countries = this.get('countries');
      for (var index = 0; index < countries.length; index++) {
        if (countries[index].code === country_code) {
          this.set('phone_code', countries[index].phone_code);
        }
      }
    },

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
      var phone_number = this.get('phone_code') + this.get('phone_number');
      var first_name = this.get('first_name');
      var last_name = this.get('last_name');
      var shop_name = this.get('shop_name');
      var shop_address = this.get('shop_address');
      var country = this.get('country');
      var return_address = this.get('return_address');
      var partnership_type = this.get('partnership_type');

      var registration = this.store.createRecord('registration', {
        email: email,
        password: password,
        username: username,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        shop_name: shop_name,
        shop_address: shop_address,
        country: country,
        return_address: return_address,
        partnership_type: partnership_type
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
