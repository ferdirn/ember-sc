import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  model: function() {
    return this.store.findAll('category');
  }
});
