import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,
    save: function(){
        var self = this;
        var upload = self.store.createRecord('reset-password',{
            email: self.get('fname')
        });
        function onSuccess(data) {
            var token = data.get('token');
            self.set('isUsernameNotFound', true);
        }
        function onFailed(data) {
            self.set('isUsernameNotFound', false);
        }
        upload.save().then(onSuccess, onFailed);
    }
   
});
