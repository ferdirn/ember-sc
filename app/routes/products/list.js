import Ember from 'ember';
import config from '../../config/environment';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 10,
  model: function(params) {
    //return this.store.find('product');
     this.findPaged('product', params);
    //console.log(ret);
    //return ret;
    //return Ember.$.getJSON(config.APP.API_HOST + '/api/product/list/');
  },
  setupController: function(controller, model) {
      controller.set('model', model);
  }
});
