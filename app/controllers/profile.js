import Ember from 'ember';

export default Ember.Controller.extend({
  isSaved: false,
  model: function() {
    this.store.createModel('profile');
  },
  actions: {
    setProfilePicture: function() {
      var file = document.getElementById('photo-file').files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        Ember.$('#profile-picture').attr('src', e.target.result)
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
      var controller = this;
      var file = document.getElementById('photo-file').files[0];


      if (file) {
        m.set('photo', file);
      }

      m.save().then(function() {
        controller.set('isSaved', true);
        // this.transitionTo('profile');
      }, function(response) {
        console.log(response);
      });

    }
  },  
  validations: {
    email: {
      presence: true,
      length: { minimum: 10}
    }
  }
});
