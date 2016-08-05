import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  actions: {
    showErrors: function() {
      this.set("showError", true);
    }
  }
});
