import DS from 'ember-data';

export default DS.Model.extend({
  token: DS.attr(),
  password: DS.attr(),
  reset_success: DS.attr(),
  email: DS.attr()
});
