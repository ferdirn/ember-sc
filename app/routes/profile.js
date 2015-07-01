import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  model: function() {
    this.store.find('profile');
  }
});
