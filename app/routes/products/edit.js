import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  categoryLevels: 10,

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
    controller.set('categoryLevels', this.get('categoryLevels'));

    for (var i = 1; i < this.get('categoryLevels'); i++) {
      var j = i + 1;
      controller.set('hasLevel' + j + 'Category', false);
    }

    var categories = model.get('categories');
    var categories_length = categories.length;
    // Ember.Logger.log(categories);
    // Ember.Logger.log(categories_length);
    for (var i = 0; i < categories_length; i++) {
      var j = i + 1;
      controller.set('category' + j, categories[i]);
      controller.set('hasLevel' + j + 'Category', true);
    }

    Ember.$.getJSON(config.APP.API_HOST + '/api/product/price-commission/', {
      'category': model.get('category'),
      'price': model.get('price')
    }).then(function(data) {
      controller.set('discount_percentage', data.commission_percentage);
      //seller_price = model.price - (model.price * (data.commission_percentage/100))
      controller.set('seller_price', data.seller_price);
    });

  }
});
