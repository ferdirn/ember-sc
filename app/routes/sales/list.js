import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';
import config from '../../config/environment';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {

    model: function() {
        return Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }

});
