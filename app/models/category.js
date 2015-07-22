import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  is_active: DS.attr(),
  parent_id: DS.attr(),
  position: DS.attr(),
  category_id: DS.attr(),
  children: DS.attr()
});
