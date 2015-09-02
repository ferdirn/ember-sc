import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(),
  replied_at: DS.attr(),
  read_at: DS.attr(),
  parent_msg: DS.attr(),
  name: DS.attr(),
  parent_msg_id: DS.attr(),
  sender_id: DS.attr(),
  sender_deleted_at: DS.attr(),
  recipient_id: DS.attr(),
  sent_at: DS.attr(),
  subject: DS.attr(),
  recipient_deleted_at: DS.attr(),
  sender: DS.attr(),
  recipient: DS.attr(),
  replies: DS.attr()
});
