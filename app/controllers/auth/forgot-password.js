import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,
  displayMessage: false,

  actions: {
    clearMessage: function() {
      this.set('displayMessage', false);
      return false;
    },
    save: function(){
      var self = this;
      var checker = document.getElementById('fname').value; 
      var upload = self.store.createRecord('reset-password',{
        email: this.get('fname')
      });
      if (checker === ''){
        alert('please fill your username');
        return false;
      }
      function onSuccess(data) {
        var token = data.get('token');
        self.set('displayMessage', true);
        self.set('isUsernameNotFound', true);
      }
      function onFailed(data) {
        self.set('displayMessage', true);      
        self.set('isUsernameNotFound', false);
      }
      upload.save().then(onSuccess, onFailed);
    }
  }
});
