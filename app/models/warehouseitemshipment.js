import DS from 'ember-data';

export default DS.Model.extend({
  order_number: DS.attr(),
  photo: DS.attr('file')
});
