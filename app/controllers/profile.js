import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend({
  model: function() {
    this.store.createModel('profile');
  },
  actions: {
    chooseSellerType: function(value, component) {
      this.set('model.seller_type', value);
    },
    choosePaymentType: function(value, component) {
      this.set('model.payment_method', value);
    },
    save: function() {
      var m = this.get('model');
      var file = document.getElementById('photo-file').files[0];

      if (file) {
        m.set('photo', file);

        m.saveWithAttachment().then(function() {
          this.transitionTo('profile');
        });

      } else {
        m.save().then(function() {
          this.transitionTo('profile');
        });
      }

    }
  },  
  validations: {
    email: {
      presence: true,
      length: { minimum: 10}
    }
  }
});
