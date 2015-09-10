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
      var file_name = uploadedFile.name;
      Ember.Logger.log('file_name : ' + uploadedFile.name);
      Ember.Logger.log('file_type : ' + uploadedFile.type);
      // if (uploadedFile.type !== 'text/csv') {
      //   alert('CSV file required');
      //   return false;
      // }

      var reader = new FileReader();
      var self = this;
      reader.onload = function() {
        var fileToUpload = reader.result;
        Ember.Logger.log(fileToUpload);
        var upload = self.store.createRecord('bulk-upload', {
          file_name: file_name,
          file: fileToUpload
        });
        upload.save();
        document.getElementById('uploadedFile').value = null;
      };
      reader.readAsDataURL(uploadedFile);
    }
  }
});
