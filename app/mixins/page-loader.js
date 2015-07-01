import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    NProgress.start();
  },
  actions: {
    didTransition: function() {
      NProgress.done();
    },
    error: function(error, transition) {
      NProgress.done();
    }
  }
});
