import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from '../config/environment';

export default EmberUploader.FileField.extend({
  url: config.APP.API_HOST+"/api/bulk-upload/",
  onError: 'onError',

  filesDidChange: function(files) {
    var self = this;
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url')
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    }

    uploader.on('didError', function(obj, text, errorThrown) {
      var responses = obj.responseJSON;
      var ret = [];

      _.each(responses, function(row) {
        _.each(row, function(value, key) {
          tmp = {field: key, reasons: value};
          ret.push(tmp);
        });
      });
      self.sendAction('onError', ret);
    });

    uploader.on('didUpload', function(obj) {
      self.sendAction('onSuccess', obj);
    });
  }.observes('files')
});
