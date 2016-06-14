import DS from 'ember-data';

export default DS.Model.extend({
  vendor: DS.attr(),
  order_number: DS.attr(),
  courier: DS.attr(),
  awb: DS.attr(),
  eta_day: DS.attr(),
  manifested: DS.attr(),
  mage_product_ids: DS.attr(),
  note: DS.attr()
});
