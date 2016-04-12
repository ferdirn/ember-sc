import DS from 'ember-data';

export default DS.Model.extend({
  old_password: DS.attr(),
  new_password: DS.attr()
});
