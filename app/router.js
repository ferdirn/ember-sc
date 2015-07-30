import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route('dashboard', { path: '/' }, function() {
      this.route('index', { path: '/' });
  });

  this.route('profile');

    this.route('products', function() {
        this.route('list', {path: '/'}); // /products/ ?
        this.route('add'); // /products/add/
        this.route('delete'); // /products/delete/
    });

    this.route('sales', function() {
        this.route('list', {path: '/'}); // /sales for listing all sales
        this.route('pending'); // /sales/pending for orders which haven't been processed
        this.route('cancelled'); // /sales/cancelled for cancelled orders
        this.route('paid'); // /sales/paid for successful orders
    });

    this.route('auth', function() {
        this.route('login');
        this.route('register');
    });

    this.route('category');
});

export default Router;
