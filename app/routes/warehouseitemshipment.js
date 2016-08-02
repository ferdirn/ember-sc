import Ember from 'ember';
import config from '../config/environment';

var OrderId = Ember.Object.extend({});

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('warehouseitemshipment');
  },
  setupController: function(controller, model) {

    controller.set("order_ids", [OrderId.create({order_number: ""})]);
    controller.set("model", model);
    var self = controller;

    this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
      headers = {};
      headers[headerName] = headerValue;
      Ember.$.ajaxSetup({headers});
    });

    var promise = Ember.$.getJSON(config.APP.API_HOST + '/api/neworders/');
    if (promise) {
      promise.done(function(data) {
        var order_ids = [];

        Ember.$.each(data, function(index, value) {
            order_ids.pushObject(OrderId.create(value));
        });

        self.set("order_ids", order_ids);

      });

    }
  },
  // Delete dummy record when navigating to a different page
  deactivate: function() {
    var model = this.modelFor('warehouseitemshipment');

    if (model.get('id') === null) {
      model.unloadRecord();
    }
  }
});
