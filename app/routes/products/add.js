import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('product').then(function(result) {
      return result.get('firstObject');
    });
  },
  setupController: function(controller, model) {
      controller.set('model', model);
      //controller.set('categories', this.store.find('category'));
      console.log('asdasdasdasdasdasdasd');
      /* 
      this.store.find('category').then(function(result) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(result);
        controller.set('categories', result);
      });
      */
      console.log(this.store.get('category'));
      
  }
  
  
});
