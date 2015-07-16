import Ember from 'ember';

export default Ember.Controller.extend({
  categories: ['asdasdasdasd'] /*function() {
    console.log('asda');
    return this.get('controller.category.content');
  }._data*/
  ,actions: {
    save: function() {
      console.log(this.store.find('category'));
      console.log('>>>>>>>>>>>>>>>>>>');
      var data = this.store.get('product');
      var productModel = this.store.createModel('product', data);
      productModel.save();
    }
  }
});
