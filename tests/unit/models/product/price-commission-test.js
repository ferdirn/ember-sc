import { moduleForModel, test } from 'ember-qunit';

moduleForModel('product/price-commission', 'Unit | Model | product/price commission', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
