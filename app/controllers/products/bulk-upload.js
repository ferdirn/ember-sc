import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isEmptyShopName: false,
  errors: {},
  init: function() {
    var self = this;

    // Check if shop_name has already filled in
    this.store.find('profile').then(function(data) {
      var profile_model = data.get('firstObject');
      var shop_name = profile_model.get('shop_name');

      if (shop_name === '') {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', true);

      } else {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', false);
      }
    });
  },
  actions: {
    uploadError: function(msg) {
      this.set('uploadResults', []);
      this.set('errors', msg);
    },
    uploadSuccess: function(msg) {
      this.set('errors', {});
      this.set('uploadResults', msg);
    }
  }
});
