import Ember from 'ember';
import EmberValidations from 'ember-validations';
import App from '../app';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  model: function() {
    this.store.createModel('profile');
  },
  actions: {
    save: function() {
      var data = this.get('content')._data;
      //var data = this.store.find('profile');
      try {
        data['seller_type'] = data['seller_type'].id;
      } catch (TypeError) {
      }
      try {
        data['payment_method'] = data['payment_method'].id;
      } catch (TypeError) {
      }
      var noFile = true;
      var profileModel = this.store.push('profile', data);
      $.each($(':file')[0].files, function(i, file) {
          profileModel.set('photo', file);
          noFile = false;
      });

      if (noFile) {
        profileModel.save().then(function() {
          this.transitionTo('profile');
        });

      } else {
        profileModel.saveWithAttachment().then(function() {
          this.transitionTo('profile');
        });
      }
      
      //console.log('asdasdxcvxcvxcv');
    }
  },  
  validations: {
    email: {
      presence: true,
      length: { minimum: 10}
    }
  }
});
