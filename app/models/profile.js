import DS from 'ember-data';

export default DS.Model.extend({
  shop_address: DS.attr(),
  vendor: DS.attr(),
  owner_address: DS.attr(),
  seller_type: DS.attr(),
  payment_method: DS.attr(),
  photo: DS.attr(),
  return_address: DS.attr(),
  identity_number: DS.attr(),
  bank_name: DS.attr(),
  bank_account_number: DS.attr(),
  phone: DS.attr(),
  birthday: DS.attr(),
  account_holder: DS.attr(),
  shop_name: DS.attr(),
  npwp: DS.attr()
});
