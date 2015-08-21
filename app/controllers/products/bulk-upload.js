import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    upload: function() {
      var uploadedFile = document.getElementById('uploadedFile').files[0];
      Ember.Logger.log(uploadedFile);
      if (uploadedFile === undefined) {
        alert('File not found');
        return false;
      }
      Ember.Logger.log(uploadedFile.type);
      if (uploadedFile.type !== 'text/csv') {
        alert('CSV file required');
        return false;
      }

      var reader = new FileReader();
      var self = this;
      reader.onload = function() {
        var fileToUpload = reader.result;
        Ember.Logger.log(fileToUpload);
        var upload = self.store.createRecord('bulk-upload', {
          file: fileToUpload
        });
        upload.save();
      };
      reader.readAsDataURL(uploadedFile);
    }
  }
});
