import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
 	model: function(params) {
		return Ember.$.getJSON(config.APP.API_HOST + '/api/salesdetail/' + params.order_number + '/');
	},
	setupController: function(controller, model) {
		controller.set('model', model); 
		controller.set('awb_model', this.store.find('awb', { order_number: model.order_number }));
	}
});
