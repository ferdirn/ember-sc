import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'sellercenter/tests/helpers/start-app';

module('Acceptance | auth/register', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /auth/register', function(assert) {
  visit('/auth/register');

  andThen(function() {
    assert.equal(currentURL(), '/auth/register');
  });

  andThen(function() {
    assert.equal(find('legend.register-legend').first().text(), 'Credential Information');
  });
});
