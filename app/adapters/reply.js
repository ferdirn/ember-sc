import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    return "message/reply";
  }
});