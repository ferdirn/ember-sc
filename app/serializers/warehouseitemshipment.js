import DS from 'ember-data';
import DRFSerializer from './drf';

export default DRFSerializer.extend({
  serializeIntoHash: function(data, type, record, options) {
    var root = Ember.String.decamelize(type.modelName);
    data[root] = this.serialize(record, options);
    console.log('shit_______________________');
  },
  createRecord: function (store, type, snapshot) {
    console.log('shit_______________________');
    var data = {};
    return this.ajax(url, "POST", { data: data });
  },
  createRecord: function (store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = this.buildURL(type.modelName, null, snapshot, "createRecord");

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
        console.log(data);
      return this.ajax(url, "POST", { data: data });
  }
});
