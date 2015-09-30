import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,
    save: function(){
        var self = this;
        var upload = self.store.createRecord('reset-password',{
            email: this.get('fname')
        });
        function onSuccess(data) {
            // var token = data.get('token');
            alert('Please check your email');
        }
        function onFailed(data) {
            alert('Username not found');
        }
        upload.save().then(onSuccess, onFailed);
    }
   
});
