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
    // /products/ ?
    this.route('list', {path: '/'});
    // /products/add/
    this.route('add');
    // /products/delete/
    this.route('delete');
    this.route('detail', {path: '/:id'});
    this.route('edit', {path: '/edit/:id'});
    this.route('bulk-upload');
  });

  this.route('sales', function() {
      this.route('list', {path: '/'}); // /sales for listing all sales
      this.route('detail', {path: '/:order_number'});
      this.route('pending'); // /sales/pending for orders which haven't been processed
      this.route('cancelled'); // /sales/cancelled for cancelled orders
      this.route('paid'); // /sales/paid for successful orders
  });

  this.route('auth', function() {
    this.route('login');
    this.route('register');
    this.route('forgot-password');
    this.route('new-password');
    this.route('forgot-success');
  });

  this.route('category');

  this.route('not-found', {path: '/*path'});

  this.route('message', function() {
    this.route('list');
  });
});

export default Router;
