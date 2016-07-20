import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return Ember.$.getJSON(config.APP.API_HOST + '/api/leafs-categories/');
  }
});
