import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    upload: function() {
      var uploadedFile = document.getElementById('uploadedFile').files[0];
      Ember.Logger.log(uploadedFile);
      var reader = new FileReader();
      var self = this;
      reader.onload = function() {
        var fileToUpload = reader.result;
        Ember.Logger.log(fileToUpload);
        var upload = self.store.createRecord('bulk-products-upload', {
          file: fileToUpload
        });
        upload.save();
      };
      reader.readAsDataURL(uploadedFile);
    }
  }
});
