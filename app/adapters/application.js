import Ember from 'ember';
import DRFAdapter from './drf';

export default DRFAdapter.extend({
  addTrailingSlashes: false
});

var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
