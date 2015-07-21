import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  
  model: function() {
    return this.store.find('profile').then(function(result) {
      return result.get('firstObject');
    });
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
  
  
});
