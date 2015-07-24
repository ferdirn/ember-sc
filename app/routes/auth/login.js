import Ember from 'ember';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';

export default Ember.Route.extend(PageLoaderMixin, {
  model: function() {
    return {};
  }
});
