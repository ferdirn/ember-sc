import DS from 'ember-data';

export default DS.Model.extend({
  oldPassword: DS.attr(),
  newPassword: DS.attr()
});
