import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('country', 'ID');
    // controller.set('partnership_type', '1');
  }
});
