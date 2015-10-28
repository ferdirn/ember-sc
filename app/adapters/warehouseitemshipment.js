import ApplicationAdapter from './application';
import FormDataAdapterMixin from 'ember-cli-form-data/mixins/form-data-adapter';

export default ApplicationAdapter.extend(FormDataAdapterMixin, {
  
  pathForType: function(type) {
    return type+"/";
  }
/*
export default ApplicationAdapter.extend({
  pathForType: function(type) {
    return type+"/";
  }
*/
});
