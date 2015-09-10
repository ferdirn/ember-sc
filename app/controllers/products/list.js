import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    selectPage: function(number) {
      this.set('page', number);
    },
  },
  sortProperties: ['id'],
  sortAscending: false,
  
  page: 1,
  perPage: 10,
  totalPages: (function() {
    return Math.ceil(this.get('length') / this.get('perPage'));
  }).property('length', 'perPage'),
  
  pages: (function() {
    var collection = Ember.A();
    
    for(var i = 0; i < this.get('totalPages'); i++) {
      collection.pushObject(Ember.Object.create({
        number: i + 1
      }));
    }
    
    return collection;      
  }).property('totalPages'),
  
  hasPages: (function() {
    return this.get('totalPages') > 1;
  }).property('totalPages'),
  
  prevPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalPages');
    
    if(page > 1 && totalPages > 1) {
      return page - 1;
    } else {
      return null;
    }
  }).property('page', 'totalPages'),
  
  nextPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalPages');
    
    if(page < totalPages && totalPages > 1) {
      return page + 1;
    } else {
      return null;
    }
  }).property('page', 'totalPages'),
 
  
  paginatedContent: (function() {
    var start = (this.get('page') - 1) * this.get('perPage');
    var end = start + this.get('perPage');
    
    return this.get('arrangedContent').slice(start, end);
  }).property('page', 'totalPages', 'arrangedContent.[]'),
  
  
  
  toggleOrder: function() {
    this.toggleProperty('sortAscending');
  }

});
