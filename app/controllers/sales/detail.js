import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sanitize: function() {
      Ember.$('#awb').bind('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z0-9-/\b._]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    },
    save: function() {
      var awb_model = null;
      Ember.$('.bs-example-modal-lg').modal('toggle');
      if (this.get('isEdit') === false) {
        var sanitizedAwb = this.get('awb_model.awb').replace(/[^a-zA-Z0-9-/._]/gi, "");
        awb_model = this.store.createRecord('awb', {
          courier: this.get('awb_model.courier'),
          awb: sanitizedAwb,
          eta_day: this.get('awb_model.eta_day'),
          manifested: this.get('awb_model.manifested'),
          note: this.get('awb_model.note'),
          order_number: this.get('model.order_number'),
          products: this.get('model.items')
        });

        awb_model.save().then(function() {
          location.reload(true);
        });
      } else {
        awb_model = this.get('awb_model');
        awb_model.get('content').save();
      }
    },
    addAwb: function(){
      if (this.get('isEdit') === false) {
        this.set('awb_model', this.store.createRecord('awb'));
      }

      Ember.$('.form-control').css('max-width', '480px');

      Ember.$('.bs-example-modal-lg').modal('toggle');
    }
  }
});
