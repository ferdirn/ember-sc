import Ember from 'ember';

export default Ember.Controller.extend({
  file_name: null,
  uploadResults: [],
  isUploading: false,
  isEmptyShopName: false,
  actions: {
    upload: function() {
      this.set('isUploading', true);
      var uploadedFile = document.getElementById('uploadedFile').files[0];
      Ember.Logger.log(uploadedFile);
      if (uploadedFile === undefined) {
        alert('File not found');
        this.set('isUploading', false);
        return false;
      }
      var file_name = uploadedFile.name;
      this.set('file_name', file_name);
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
        function onSuccess(data) {
          self.set('uploadResults', data.get('result'));
          self.set('isUploading', false);
        }
        upload.save().then(onSuccess);
        document.getElementById('uploadedFile').value = null;
      };
      reader.readAsDataURL(uploadedFile);
    }
  },
  init: function() {
    var self = this;

    // Check if shop_name has already filled in
    this.store.find('profile').then(function(data) {
      var profile_model = data.get('firstObject');
      var shop_name = profile_model.get('shop_name');
      if (shop_name === '') {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', true);
      } else {
        // self.transitionToRoute('profile');
        self.set('isEmptyShopName', false);
      }
    });
  }
});
