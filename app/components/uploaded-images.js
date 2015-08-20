import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setPrimaryImage: function(image) {
      var model = this.get('model');

      model.set('image', image);
      
      model.set('primaryImage', image);
    },
    deleteImage: function(image) {
      var model = this.get('model');
      var images = model.get('images');

      images.removeObject(image);

      if (model.get('image') === image) {
        model.set('image', null);
      }
    }
  }
});
