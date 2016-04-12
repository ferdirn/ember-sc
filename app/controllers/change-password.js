import Ember from 'ember';

export default Ember.Controller.extend({
	displayPassError: false,
	displayPassChanged: false,
	errorMessage: null,
	actions:{
		save: function() {
			var oldPassword =  this.get('oldPassword');
			var newPassword = this.get('newPassword');
			var newRepassword = this.get('retypePassword');
			var self = this;

			this.set('displayPassChanged', false);
			this.set('displayPassError', false);

			if (oldPassword === undefined || oldPassword === '') {
				this.set('errorMessage', 'Old password can not be empty.');
				this.set('displayPassError', true);
				return false;
			}

			if (newPassword === undefined || newPassword === '') {
				this.set('errorMessage', 'New password can not be empty.');
				this.set('displayPassError', true);
				return false;
			} else {
				if (newRepassword !== newPassword) {
					this.set('errorMessage', 'New password did not match.');
					this.set('displayPassError', true);
					return false;
				}
			}

			var changePassword = this.store.createRecord('change-password', {
				old_password: oldPassword,
				new_password: newPassword
			});

			function onSuccess() {
				self.set('displayPassChanged', true);
				Ember.$('#changePasswordForm').trigger('reset');
			}

			function onFailed() {
				self.set('errorMessage', 'Your old password did not match to our data.');
				self.set('displayPassError', true);
			}

			changePassword.save().then(onSuccess, onFailed);
		}
	}
});
