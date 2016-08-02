import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  session: Ember.inject.service('session'),
  init: function() {
    this._super();
    var self = this;
    this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
      headers = {};
      headers[headerName] = headerValue;
      Ember.$.ajaxSetup({headers});
    });
    var promise = Ember.$.getJSON(config.APP.API_HOST + '/api/paidorders/');

    if (promise) {
      promise.done(function(data) {
        self.set('orders', data);
      });
      return this.set('promise', promise);
    }
  }
});
