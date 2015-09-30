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
		// var pathArray = window.location.pathname.split('/');
		// var link = pathArray[1];
		// alert(link);
		function getUrlVars() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		}
		var token = getUrlVars()["token"];
		var email = getUrlVars()["email"];

		// alert(first);
		// alert(second);
		var upload = this.store.createRecord('reset-password', {
			token: token,
			email: email,
			password: this.get('password'),
			repassword: this.get('repassword')
		});
		function onSuccess(data) {
            alert('you have successfully reset your password');
        }
        function onFailed(data) {
            alert('this is wrong');
        }
		upload.save().then(onSuccess, onFailed);
	}
	});
