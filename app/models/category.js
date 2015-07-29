import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  is_active: DS.attr(),
  position: DS.attr(),
  magento_id: DS.attr(),
  parent: DS.attr()
});
