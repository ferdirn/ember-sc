import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 10,
  model: function() {
    return this.store.find('product');
    // this.findPaged('product', params);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
