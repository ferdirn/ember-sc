import Ember from 'ember';

export default Ember.Controller.extend({
	fname: null,
	isUsernameNotFound: true,
    save: function(){
        var fname = this.get('fname');
        var tb1 = $("#fname").val();

        $.ajax({
          type: "POST",
          url: 'http://localhost:8000/api/reset-password',
          data: "value="+tb1,
          success: function(data) {
            alert(tb1)
        },
        dataType: JSON
    });

    }

    // save: function () {
    // 	var fname = this.get('fname');
    //     var validUsernames = this.get('validUsernames');
    // 	if (validUsernames.indexOf(fname) >= 0){
    // 		this.set('isUsernameNotFound', true);
    // 	}
    // 	else
    // 	{
    // 		this.set('isUsernameNotFound', false);
    // 	}
    // }
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
