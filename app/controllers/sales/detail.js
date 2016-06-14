import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var self = this;
      var order_number = this.get('model.order_number');
      var new_awb = this.store.createRecord('awb', {
        courier: this.get('courier'),
        awb: this.get('awb'),
        eta_day: this.get('eta_day'),
        manifested: this.get('manifested'),
        note: this.get('note'),
        order_number: order_number
      });

      Ember.$('.bs-example-modal-lg').modal('toggle');
      new_awb.save().then(function() {
        location.reload();
      }).catch(function(reason) {
        var detail = reason.errors[0].detail;
        self.set('errorMsg', detail.msg);
      });
    },
    addAwb: function(){
      Ember.$('.bs-example-modal-lg').modal('toggle');
    }
  }
});
