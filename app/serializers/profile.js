import Ember from 'ember';
import DRFSerializer from './drf';

export default DRFSerializer.extend({
  extract: function(store, type, payload) {
    return [payload];
  },
  serializeIntoHash: function(data, type, record, options) {
    var root = Ember.String.decamelize(type.modelName);
    data[root] = this.serialize(record, options);
  },
});
