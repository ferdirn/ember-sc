import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr(),
  product_sku: DS.attr(),
  product_attribute_set: DS.attr(),
  name: DS.attr(),
  description: DS.attr(),
  short_description: DS.attr(),
  weight: DS.attr(),
  status: DS.attr(),
  categories: DS.attr(),
  websites: DS.attr(),
  tax_class: DS.attr(),
  url_key: DS.attr(),
  url_path: DS.attr(),
  magento_product_id: DS.attr(),
  price: DS.attr(),
  special_price: DS.attr(),
  special_from_date: DS.attr(),
  special_to_date: DS.attr()
});
