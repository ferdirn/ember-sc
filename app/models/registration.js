import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  password: DS.attr(),
  username: DS.attr(),
  phone_number: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr
});
