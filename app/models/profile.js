import DS from 'ember-data';
import Attachable from '../mixins/attachable';

export default DS.Model.extend(Attachable, {

  shop_address: DS.attr(),
  vendor_id: DS.attr(),
  owner_address: DS.attr(),
  seller_type: DS.attr(),
  payment_method: DS.attr(),

  photo: DS.attr(),
  attachmentAs: 'photo',
  return_address: DS.attr('string'),
  identity_number: DS.attr(),
  bank_name: DS.attr(),
  bank_account_number: DS.attr(),
  phone: DS.attr(),
  birthday: DS.attr(),
  account_holder: DS.attr(),
  shop_name: DS.attr(),
  npwp: DS.attr(),
  email: DS.attr(),
  seller_name: DS.attr(),
  seller_type_choices: DS.attr(),
  payment_choices: DS.attr(),
  shop_link: DS.attr()

});
