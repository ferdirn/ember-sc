import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	isEdit: false,
	model: function(params) {
		return Ember.$.getJSON(config.APP.API_HOST + '/api/salesdetail/' + params.order_number + '/');
	},
	setupController: function(controller, model) {
		var awb_model = this.store.find('awb', model.order_number);
		controller.set('model', model); 
		
		awb_model.then(function() {
			controller.set('isEdit', true);
		}).catch(function() {
			controller.set('isEdit', false);
		});

		controller.set('awb_model', awb_model);
	}
});
