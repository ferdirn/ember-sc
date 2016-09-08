import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(RouteMixin, AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  perPage: 10,
  model: function() {
    var m = this.store.peekAll('product');
    Ember.Logger.log('data=' + m.get('length'));
    if (m.get('length') > 0) {
      Ember.Logger.log('Product model is already loaded.');
      return m;
    } else {
      Ember.Logger.log('Product model is not loaded already.');
      return this.store.findAll('product');
    }
    // this.findPaged('product', params);
  },
  setupController: function(controller, model) {
    Ember.Logger.log('Entering routes/products/list setupController');
    controller.set('model', model);
    controller.set('modelAll', model);
    controller.set('number', 1);
  }
});
