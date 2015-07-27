import DRFSerializer from './drf';
import DS from 'ember-data';

export default DRFSerializer.extend({
  //primaryKey: 'category_id',
  /*
	extract: function(store, type, payload) {
    alert(payload);
		return [payload];
	},
  pushPayload: function(store, rawPayload) {
    alert(rawPayload);
    return [rawPayload];
  }*/
  push: function(modelName, data) {
      alert(data);
  }
});
