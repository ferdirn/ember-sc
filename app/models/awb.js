import DS from 'ember-data';

export default DS.Model.extend({
  order_number: DS.attr(),
  courier: DS.attr(),
  awb: DS.attr(),
  eta_day: DS.attr(),
  manifested: DS.attr(),
  note: DS.attr(),
  products: DS.attr()
});
