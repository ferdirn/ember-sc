import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('uploaded-images', 'Integration | Component | uploaded images', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{uploaded-images}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#uploaded-images}}
      template block text
    {{/uploaded-images}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
