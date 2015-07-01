import Ember from 'ember';
import PageLoaderMixin from '../../../mixins/page-loader';
import { module, test } from 'qunit';

module('Unit | Mixin | page loader');

// Replace this with your real tests.
test('it works', function(assert) {
  var PageLoaderObject = Ember.Object.extend(PageLoaderMixin);
  var subject = PageLoaderObject.create();
  assert.ok(subject);
});
