import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', { path: '/' });
  this.route('product_add', { path: '/product/add'});
  this.route('manage_order', { path: '/order/manage'});
  this.route('list_sale', { path: '/sales'});

  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });
  this.route('profile');
});

export default Router;
