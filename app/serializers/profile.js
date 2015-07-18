import DRFSerializer from './drf';

export default DRFSerializer.extend({
  extract: function(store, type, payload) {
    return [payload];
  }
});
