import DS from 'ember-data';

export default DS.Model.extend({
  product_id: DS.attr(),
  special_price: DS.attr(),
  special_from_date: DS.attr(),
  special_to_date: DS.attr(),
  special_cost: DS.attr()
});
