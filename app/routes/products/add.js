import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  categoryLevels: 10,

  renderTemplate: function() {
    this.render('products.add-edit');
  },
  model: function() {
    return this.store.createRecord('product');
  },
  setupController: function(controller, model) {
    Ember.Logger.log('Entering routes/products/add setupController');

    controller.set('model', model);
    controller.set('canEditSpecialPrice', false);
    controller.set('categoryLevels', this.get('categoryLevels'));

    for (var i = 1; i < this.get('categoryLevels'); i++) {
      var j = i + 1;
      controller.set('hasLevel' + j + 'Category', false);
    }

    controller.set('category1', 0);

    // Ember.$.getJSON(config.APP.API_HOST + '/api/product-attributes/').then(function(data) {
    //   controller.set('productAttributes', data);
    // });
  },

  // Delete dummy record when navigating to a different page
  deactivate: function() {
    var model = this.modelFor('products.add');

    if (model.get('id') === null) {
      model.unloadRecord();
    }
  }
});
