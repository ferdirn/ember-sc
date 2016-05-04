import Ember from 'ember';

export default Ember.Controller.extend({
	matchPassword: function() {
		var password = this.get('password');
		var repassword = this.get('repassword');

		if (password !== '') {
			if (repassword !== password) {
				this.set('isPasswordNotMatch', true);
			} else {
				this.set('isPasswordNotMatch', false);
			}
		}
	},
	save: function()
	{
    	var self = this;
		function getUrlVars() {
			var vars = {};
			window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		}
		var token = getUrlVars()["token"];
		var email = getUrlVars()["email"];

		var upload = this.store.createRecord('reset-password', {
			token: token,
			email: email,
			password: this.get('password'),
			repassword: this.get('repassword')
		});
		function onSuccess() {
            self.transitionTo('auth.login');
        }
        function onFailed() {
            alert('reset password failed');
        }
		upload.save().then(onSuccess, onFailed);
	}
});
