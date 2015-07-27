import Ember from 'ember';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, {
  actions: {
    sessionAuthenticationFailed: function(errors) {
      var controller = this.controllerFor('auth.login');
      _.each(errors, function(val, key) {
        controller.set('errors.'+key, val);
      });
    }
  }
});
