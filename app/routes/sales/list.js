import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {

  model: function() {
    return Ember.$.getJSON('http://127.0.0.1:8000/api/salesreport');
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }


});
