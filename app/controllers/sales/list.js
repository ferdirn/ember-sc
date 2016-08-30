import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  statusFilters: [
    {statusLabel: "all", statusValue: "all"},
    {statusLabel: "invoiced", statusValue: "invoiced"},
    {statusLabel: "pending", statusValue: "pending"},
    {statusLabel: "canceled", statusValue: "canceled"}
  ],

  refreshChart: Ember.observer('model.allsales', function() {
    var chartLabel = [];
    var chartValue = [];
    var totalOrderedQty = 0;
    var totalSales = 0;
    var allsales = this.get('model.allsales');
    for (var i = 0; i < allsales.length; i++) {
      totalOrderedQty += allsales[i].qty_ordered;
      totalSales += (allsales[i].price * allsales[i].qty_ordered);
      if (chartLabel.indexOf(allsales[i].created_date) === -1) {
        chartLabel.push(allsales[i].created_date);
        chartValue.push(allsales[i].price * allsales[i].qty_ordered);
      } else {
        chartValue[chartLabel.indexOf(allsales[i].created_date)] += allsales[i].price * allsales[i].qty_ordered;
      }
    }

    this.set('model.statistic.total_ordered', totalOrderedQty);
    this.set('model.statistic.total_revenue', totalSales);
    this.set('model.statistic.average_sales', (totalSales/totalOrderedQty));
    this.set('model.chart.labels', chartLabel.reverse());
    this.set('model.chart.value', chartValue.reverse());
  }),

  sortedProperties: {
    created_at: true,
    order_number: false,
    name: false,
    sku: false,
    qty_ordered: false,
    price: false,
    revenue: false
  },

  sortProperties: ['created_at:desc'],
  sortAscending: false,
  sortedFilteredData: Ember.computed.sort('filteredData', 'sortProperties'),
  paginatedContent: Ember.computed('sortedFilteredData', 'startIndex', 'endIndex', function() {
    return this.get('sortedFilteredData').slice(this.get('startIndex'), this.get('endIndex'));
  }),

  clearSortedProperties: function() {
    this.set('sortedProperties.created_at', false);
    this.set('sortedProperties.order_number', false);
    this.set('sortedProperties.name', false);
    this.set('sortedProperties.sku', false);
    this.set('sortedProperties.qty_ordered', false);
    this.set('sortedProperties.price', false);
    this.set('sortedProperties.revenue', false);
  },

  addDays: function(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  },

  actions: {
    filter: function() {
      Ember.Logger.log('Entering list filter');

      var self = this;
      var startDate = this.get('startDate'), endDate = this.get('endDate');
      var b = new Date(startDate), d = new Date(endDate);
      d = this.addDays(d, 1);

      if ( Object.prototype.toString.call(b) === "[object Date]" ) {
        // it is a date
        if ( isNaN( b.getTime() ) ) {  // d.valueOf() could also work
          alert('Date is not valid');
          return;
        }
        else {
          // date is valid
        }
      }
      else {
        alert('Date is not valid');
        return;
      }

      if ( Object.prototype.toString.call(d) === "[object Date]" ) {
        // it is a date
        if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
          alert('Date is not valid');
          return;
        }
        else {
          // date is valid
        }
      }
      else {
        alert('Date is not valid');
        return;
      }

      endDate = d.toISOString().slice(0,10);
      Ember.Logger.log('Filter sales from ' + startDate + ' to ' + endDate);
      this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
        headers = {};
        headers[headerName] = headerValue;
        Ember.$.ajaxSetup({headers});
      });

      Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/', {
        start_date: startDate,
        end_date: endDate
      }).then(function(data) {
        Ember.Logger.log('List filter promise done');

        self.set('model', data);
        self.set('filteredData', data.allsales);
        self.set('selectedStatus.statusValue', 'all');

        self.send('paginate', 1);
      });
    },

    paginate: function(page) {
      Ember.Logger.log('Entering list paginate');

      var filteredDataLength = this.get('filteredData').get('length');
      var pageCount = this.get('pageCount');
      var pageSize = this.get('pageSize');
      if (filteredDataLength > 0) {
        pageCount = Math.ceil(filteredDataLength / pageSize);
      } else {
        pageCount = 1;
      }
      var hasPagination = (pageCount > 1);

      var startIndex = (page - 1) * pageSize;
      var endIndex = page * pageSize;
      var hasPrevious = (page > 1);
      var hasNext = (page < pageCount);
      var previousPage = page - 1;
      var nextPage = page + 1;

      var pageArray = [];
      var p = 0;
      while (p < pageCount) {
        var pageObj = Ember.Object.create({
          number: ++p,
          active: (p === page)?'active':''
        });
        pageArray.pushObject(pageObj);
      }

      this.set('startIndex', startIndex);
      this.set('endIndex', endIndex);
      this.set('hasPagination', hasPagination);
      this.set('hasPrevious', hasPrevious);
      this.set('hasNext', hasNext);
      this.set('previousPage', previousPage);
      this.set('nextPage', nextPage);
      this.set('pageArray', pageArray);
      this.set('pageCount', pageCount);
      this.set('page', page);
    },

    search: function() {
      var modelFilter = this.model.allsales;
      var filter = this.get('filter_data').toLowerCase().trim();

      var result =  modelFilter.filter(function(item) {
        return (item.name.toLowerCase().indexOf(filter) !== -1 || item.sku.toLowerCase().indexOf(filter) !== -1);
      });
      this.set('filteredData', result);
      this.send('paginate', 1);
    },

    sortBy: function(property) {
      Ember.Logger.log('Entering list sortBy');

      var currentSortProperties = this.get('sortProperties');
      var descProperty = property + ':desc';
      if (currentSortProperties[0] === property || currentSortProperties[0] === descProperty) {
        this.toggleProperty('sortAscending');
      } else {
        this.clearSortedProperties();
        this.set('sortedProperties.'+property, true);
      }
      if (this.get('sortAscending')) {
        this.set('sortProperties', [property]);
      } else {
        this.set('sortProperties', [descProperty]);
      }
    }
  }
});
