import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';
import config from '../../config/environment';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('profile').then(function(result) {
      return result.get('firstObject');
    });
  },
  setupController: function(controller, model) {
    Ember.Logger.log('Entering dashboard route.setupController');

    Ember.$.getJSON(config.APP.API_HOST + '/api/product/active/').then( function(data) {
        controller.set('activeProduct', data.total);
    });
    Ember.$.getJSON(config.APP.API_HOST + '/api/product/inactive/').then( function(data) {
        controller.set('inactiveProduct', data.total);
    });
    controller.set('model', model);
  }

});
