import Ember from 'ember';
import EmberValidations from 'ember-validations';

<<<<<<< HEAD
export default Ember.ObjectController.extend(/*EmberValidations.Mixin,*/ {
  
=======
export default Ember.Controller.extend({
  model: function() {
    this.store.createModel('profile');
  },
>>>>>>> de00d39d46f3b30389eece0932add7e8eb034fc8
  actions: {
    setProfilePicture: function() {
      var file = document.getElementById('photo-file').files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#profile-picture').attr('src', e.target.result)
        .width(60)
        .height(60);
      };
      reader.readAsDataURL(file);
    },
    chooseSellerType: function(value, component) {
      this.set('model.seller_type', value);
    },
    choosePaymentType: function(value, component) {
      this.set('model.payment_method', value);
    },
    save: function() {
      var m = this.get('model');
      var file = document.getElementById('photo-file').files[0];

<<<<<<< HEAD
      if (noFile) {
        profileModel.save().then(function() {
        });

      } else {
        profileModel.saveWithAttachment().then(function() {
        });
      }
       
      this.get('target').transitionTo('profile');
=======
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

>>>>>>> de00d39d46f3b30389eece0932add7e8eb034fc8
    }
  },  
  validations: {
    email: {
      presence: true,
      length: { minimum: 10}
    }
  }
});
