import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('products.add-edit');
  },
  model: function(params, transition) {
    return this.get('store').find('product', params.id);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('edit', true);

    if (model.get('subcategory') !== 0) {
        controller.set('hasLevel2Category', true);
    } else {
        controller.set('hasLevel2Category', false);
    }

    if (model.get('categories') !== 0) {
        controller.set('hasLevel3Category', true);
    } else {
        controller.set('hasLevel3Category', false);
    }

    // Ember.$.getJSON(config.APP.API_HOST + '/api/product-attributes/').then(function(data) {
    //   controller.set('productAttributes', data);
    // });
  }
});
