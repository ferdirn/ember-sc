import Ember from 'ember';

export default Ember.Controller.extend({
  sortedProperties: {
    name: true,
    qty: false,
    price: false,
    id: false
  },
  availSorting: ['name', 'name:desc', 'qty', 'qty:desc', 'price', 'price:desc'],
  sortProperties: ['name'],
  sortAscending: true,
  sortedData: Ember.computed.sort('model', 'sortProperties'),
  sortedPageContent: Ember.computed('sortedData', 'page', 'perPage', 'sortProperties' ,function(){
    var start = (this.get('page') - 1) * this.get('perPage');
    var end = start + this.get('perPage');
    return this.get('sortedData').slice(start,end);
  }),



  clearSortedProperties: function() {
    this.set('sortedProperties.id', false);
    this.set('sortedProperties.name', false);
    this.set('sortedProperties.qty', false);
    this.set('sortedProperties.price', false);
  },

  actions: {
    selectPage: function(number) {
      this.set('page', number);
      this.set('number', number);
    },
    isActive: function(value){
      console.log(value);
      this.set('number', value);
    },
    isChoosingTile: false,

    toList: function(){
      this.set('isChoosingTile', true);
    },
    toTile: function(){
      this.set('isChoosingTile', false);
    },
    toggleOrder: function(property) {
      var newSortProperties = Ember.A();
      var descProperty = property + ':desc';
      var currentProperty = this.get('sortProperties')[0].split(':');

      // only toggle if the same property is clicked again
      if (property === currentProperty[0]) {
        this.toggleProperty('sortAscending');
      } else {
        this.clearSortedProperties();
        this.set('sortedProperties.'+property, true);
      }

      if (this.get('sortAscending')) {
        newSortProperties.pushObject(property);
      } else {
        newSortProperties.pushObject(descProperty);
      }

      this.set('sortProperties', newSortProperties);
      this.send('selectPage', 1);
    }
  },


  page: 1,
  perPage: 10,
  totalPages: (function() {
    return Math.ceil(this.get('model').get('length') / this.get('perPage'));
  }).property('length', 'perPage'),

  pages: (function() {
    var collection = Ember.A();

    for(var i = 0; i < this.get('totalPages'); i++) {
      collection.pushObject(Ember.Object.create({
        number: i + 1,
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
    return this.get('model');
  }),

});
