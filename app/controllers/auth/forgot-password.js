import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,
	validUsernames: ['kambing', 'ayam', 'sapi'],
    save: function () {
    	var fname = this.get('fname');
        var validUsernames = this.get('validUsernames');
    	if (validUsernames.indexOf(fname) >= 0){
    		this.set('isUsernameNotFound', true);
    	}
    	else
    	{
    		this.set('isUsernameNotFound', false);
    	}
    }
 //    fname: null,
	// isUsernameNotFound: false,
	// validUsernames: ['kambing', 'ayam', 'sapi'],
 //    save: function () {
 //    	var fname = this.get('fname');
 //    	if (validUsernames.search(fname) >= 0){
 //    		this.set('isUsernameNotFound', false);
 //    		alert(fname);
 //    	}
 //    	else
 //    	{
 //    		this.set('isUsernameNotFound', true);
 //    		alert('halo human');
 //    	}
 //    }
});
