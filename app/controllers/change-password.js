import Ember from 'ember';

export default Ember.Controller.extend({
	displayPassError: false,
	displayPassChanged: false,
	actions:{
		matchingPassword: function() {
		var newPassword = this.get('newPassword');
		var newRepassword = this.get('retypePassword');

			if (newPassword !== '') {
				if (newRepassword !== newPassword) {
					this.set('displayPassError', true);
					return false;
					

				} else {
					
					this.set('displayPassError', false);
				}
			}
		},
		save: function(){

			this.send('matchingPassword');
			var self = this;

			var oldPassword =  this.get('oldPassword');
			var newPassword = this.get('newPassword');

			var changePassword = this.store.createRecord('change-password', {
				oldPassword: this.get('oldPassword'),
				newPassword: this.get('newPassword')
			});

			function onSuccess(data){
				self.set('displayPassChanged', true);
			}
			function onFailed(data){
				self.set('displayPassChanged', false);
			}
			changePassword.save().then(onSuccess, onFailed);
		}
	}
});
