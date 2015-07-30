import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  //customize endpoint
  pathForType: function(type) {
      return "product/list";
  }
});
