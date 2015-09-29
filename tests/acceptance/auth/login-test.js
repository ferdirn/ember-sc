import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'sellercenter/tests/helpers/start-app';

module('Acceptance | auth/login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /auth/login', function(assert) {
  visit('/auth/login');

  andThen(function() {
    assert.equal(currentURL(), '/auth/login');
  });

  andThen(function() {
    assert.equal(find('input#identification').attr('placeholder'), 'Enter username/email address');
  });
});
