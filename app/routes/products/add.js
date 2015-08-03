import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  renderTemplate: function() {
      this.render('products.add-edit');
  },    
  model: function() {
    return this.store.createRecord('product');
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
  
  
});
