import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    setPicture: function() {
      var file = document.getElementById('photo-file').files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        Ember.$('#photo').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
    },
    save: function() {
      var m = this.get('model');
      var controller = this;
      var file = document.getElementById('photo-file').files[0];


      if (file) {
        m.set('photo', file);
      }

      m.save().then(function() {
         controller.transitionTo('warehouse-item.list');
      }, function() {
        //console.log(response);
      });

      var reader = new FileReader();

      reader.onload = function (e) {
        Ember.$('#photo').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);

    },
    itemSelected: function(item) {
      //this.get('controller').set('selection', item.get('code'));
      var model = this.get('model');
      model.set('order_number', item.order_number);
    }
  }
});
