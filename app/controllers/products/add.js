import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var data = this.get('content');
      //console.log(this.store.find('product'));
      
      console.log(data);
      var productModel = this.store.createRecord('product', data);
      productModel.save();
    }
  }
});
