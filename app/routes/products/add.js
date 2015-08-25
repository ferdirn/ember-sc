import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  renderTemplate: function() {
    this.render('products.add-edit');
  },
  model: function() {
    return this.store.createRecord('product');
  },
  setupController: function(controller, model) {
    Ember.Logger.log('Entering products.add route.setupController');

    controller.set('model', model);
    controller.set('hasLevel2Category', false);
    controller.set('hasLevel3Category', false);

    // Ember.$.getJSON(config.APP.API_HOST + '/api/product-attributes/').then(function(data) {
    //   controller.set('productAttributes', data);
    // });
  }
});
