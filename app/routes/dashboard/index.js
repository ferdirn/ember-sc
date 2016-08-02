import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  model: function() {
    return this.store.findAll('profile').then(function(result) {
      return result.get('firstObject');
    });
  },
  setupController: function(controller, model) {
    Ember.Logger.log('Entering dashboard route.setupController');

    this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
      headers = {};
      headers[headerName] = headerValue;
      Ember.$.ajaxSetup({headers});
    });
    Ember.$.getJSON(config.APP.API_HOST + '/api/product/active/').then( function(data) {
        controller.set('activeProduct', data.total);
    });
    Ember.$.getJSON(config.APP.API_HOST + '/api/product/inactive/').then( function(data) {
        controller.set('inactiveProduct', data.total);
    });
    Ember.$.getJSON(config.APP.API_HOST + '/api/dashboardstatistic/').then( function(data) {
        controller.set('dashboardStatistic', data);
    });
    controller.set('model', model);
  },
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }

});
