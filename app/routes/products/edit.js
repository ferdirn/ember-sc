import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('products.add-edit');
  },
  model: function(params) {
    return this.get('store').find('product', params.id);
  },
  setupController: function(controller, model) {
    model.reload();
    model.set('primaryImage', model.get('image'));
    controller.set('model', model);
    controller.set('edit', true);
    controller.set('canEditSpecialPrice', true);

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

    Ember.$.getJSON(config.APP.API_HOST + '/api/product/price-commission/', {'category': model.get('categories'), 'price': model.get('price')}).then(function(data) {
      controller.set('discount_percentage', data.commission_percentage);
      //seller_price = model.price - (model.price * (data.commission_percentage/100))
      controller.set('seller_price', data.seller_price);
    });

  }
});
