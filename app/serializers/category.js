import DRFSerializer from './drf';
import DS from 'ember-data';

export default DRFSerializer.extend({
  /*
	extract: function(store, type, payload) {
		return [payload];
	},*/
  push: function(modelName, data) {
      alert(data);
  }
});
