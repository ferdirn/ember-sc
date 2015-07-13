import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  model: function() {
    this.store.createModel('profile');
  },
  actions: {
    save: function() {
      var data = this.get('content')._data;
      //var data = this.get('model');
      // exclude id since we dont need it anyway
      //delete data['id'];
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
