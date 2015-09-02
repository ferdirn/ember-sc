import DS from 'ember-data';

export default DS.Model.extend({
  recipient: DS.attr(),
  subject: DS.attr(),
  body: DS.attr(),
  message_id: DS.attr()
});
