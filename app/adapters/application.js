import Ember from 'ember';
import DRFAdapter from './drf';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { service  } = Ember.inject;

export default DRFAdapter.extend(DataAdapterMixin, {
  session: service('session'),
  authorizer: 'authorizer:application',
  addTrailingSlashes: true,
  shouldReloadAll: function() { return true; }
});

var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('change-password');
inflector.uncountable('registration');
inflector.uncountable('bulk-upload');
inflector.uncountable('product/active');
inflector.uncountable('product/price-commission');
