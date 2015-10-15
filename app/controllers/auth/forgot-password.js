import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,

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
      alert('please check your email');
    }
    function onFailed(data) {
      alert('Username not found');
      this.set('isUsernameNotFound', false);
    }
    upload.save().then(onSuccess, onFailed);
  }

});
