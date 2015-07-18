import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  
  
  model : function(params){
                   return Ember.$.getJSON(window.apiHost+'/communities/'+params.group_id+'/follow-ups');
                      },

  setupController: function(controller, model) {
      controller.set('model', model);
  }
  
  
});
