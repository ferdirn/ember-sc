import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  init: function() {
  },
  actions: {
    displayMessage: function(value) {
        this.set('currentMessage', this.store.find('message', value.get('id')));
        Ember.$.getJSON(config.APP.API_HOST + '/api/message/read/' + value.get('id') + '/').then(function(data) {
          Ember.Logger.log(data);
        });
    },
    sendMessage: function(value) {
      var self = this;
      var compose = this.store.createRecord('reply', {
        recipient: value.get('sender'),
        body: this.get('body'),
        subject: 'Re: ' + value.get('subject'),
        message_id: value.get('id')
      });
      compose.save().then(function() {
        self.set('model', self.store.findAll('message'));
        self.set('currentMessage', self.store.find('message', value.get('id')));
        self.set('body', '');
      });
      return false;
    }
  }
});
