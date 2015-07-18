import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', { path: '/' });

  this.route('products', function() {
    this.route('list', {path: '/products'}); // /products/ ?
    this.route('add'); // /products/add/
    this.route('delete'); // /products/delete/
  });

  this.route('sales', function() {
    this.route('list', {path: '/sales'}); // /sales for listing all sales
    this.route('pending'); // /sales/pending/ for orders which haven't been processed
    this.route('cancelled'); // /sales/cancelled/ for cancelled orders
    this.route('success'); // /sales/success/ for successful orders
  });

  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });
  this.route('profile');

  this.route('product', function() {
    this.route('add');
  });
  this.route('category');
});

export default Router;
