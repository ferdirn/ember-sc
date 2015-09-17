import DS from 'ember-data';

export default DS.Model.extend({
  file_name: DS.attr(),
  file: DS.attr(),
  result: DS.attr()
});
