import Ember from 'ember';
import DRFAdapter from './drf';

export default DRFAdapter.extend({
  addTrailingSlashes: true,
  shouldReloadAll: function() { return true; }
});

var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('registration');
inflector.uncountable('bulk-upload');
