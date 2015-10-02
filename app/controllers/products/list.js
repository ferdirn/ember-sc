import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortedProperties:{
    name: true,
    qty: false,
    price: false,
    id: false
  },
  sortProperties: ['name:desc' , 'qty:desc' , 'price:desc'],
  sortAscending: false,
  sortedPageContent: Ember.computed.sort('paginatedContent', 'sortProperties'),

  clearSortedProperties: function() {
    this.set('sortedProperties.id', false);
    this.set('sortedProperties.name', false);
    this.set('sortedProperties.qty', false);
    this.set('sortedProperties.price', false);
  },
  actions: {
    selectPage: function(number) {
      this.set('page', number);
    },
    isChoosingTile: false,

    toList: function(){
      this.set('isChoosingTile', true);
    },
    toTile: function(){
      this.set('isChoosingTile', false);
    },
    toggleOrder: function(property) {
      var currentSortProperties = this.get('sortProperties');
      var newSortProperties = [property];
      var descProperty = property + ':desc';
      if (currentSortProperties[0] === property || currentSortProperties[0] === descProperty) {
        this.toggleProperty('sortAscending');
      } else {
        this.clearSortedProperties();
        this.set('sortedProperties.'+property, true);
      }
      var sortAscending = this.get('sortAscending');
      if (sortAscending) {
        newSortProperties = [property];
      } else {
        newSortProperties = [descProperty];
      }
      this.set('sortProperties', newSortProperties);
      console.log(this.get('sortedProperties'));
    }
  },
  
  
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
  
  

});
