import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  statusFilters: [
    {statusLabel: "all", statusValue: "all"},
    {statusLabel: "invoiced", statusValue: "invoiced"},
    {statusLabel: "pending", statusValue: "pending"},
    {statusLabel: "canceled", statusValue: "canceled"}
  ],

  addDays: function(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  },

  onStatusFilterChange: function() {
    Ember.Logger.log('Entering list onStatusFilterChange');

    this.page = 1;
    var value = this.selectedStatus.statusValue;
    var allsales = this.model.allsales;
    var filteredData = [];

    if (value === 'all') {
      filteredData = allsales;
    } else if (value === 'invoiced') {
      _.each(allsales, function(value) {
        if (value.status === 'invoiced') {
          filteredData.pushObject(value);
        }
      });
    } else if (value === 'pending') {
      _.each(allsales, function(value) {
        if (value.status === 'pending') {
          filteredData.pushObject(value);
        }
      });
    } else if (value === 'canceled') {
      _.each(allsales, function(value) {
        if (value.status === 'canceled') {
          filteredData.pushObject(value);
        }
      });
    }

    var filteredDataLength = filteredData.length;
    if (filteredDataLength > this.pageSize) {
      this.set('pageContent', filteredData.slice(0, this.pageSize));
    } else {
      this.set('pageContent', filteredData);
    }
    if (filteredDataLength > 0) {
      this.pageCount = Math.ceil(filteredDataLength / this.pageSize);
    } else {
      this.pageCount = 1;
    }
    var hasPagination = (this.pageCount > 1);

    var pageArray = [];
    var p = 0;
    while (p < this.pageCount) {
      var pageObj = Ember.Object.create({
        number: ++p,
        active: (p === this.page)?'active':''
      });
      pageArray.pushObject(pageObj);
    }

    var hasPrevious = false;
    var hasNext = true;
    var previousPage = 0;
    var nextPage = 2;

    this.set('filteredData', filteredData);
    this.set('pageCount', this.pageCount);
    this.set('pageArray', pageArray);
    this.set('selectedStatus.statusValue', value);
    this.set('hasPagination', hasPagination);
    this.set('hasPrevious', hasPrevious);
    this.set('hasNext', hasNext);
    this.set('previousPage', previousPage);
    this.set('nextPage', nextPage);

  }.observes('selectedStatus.statusValue'),

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
      Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/', {
        start_date: startDate,
        end_date: endDate
      }).then(function(data) {
        Ember.Logger.log('List filter promise done');

        self.page = 1;
        self.set('pageContent', data.allsales);
        var pageContentLength = self.pageContent.length;
        if (pageContentLength > self.pageSize) {
          self.set('pageContent', self.pageContent.slice(0, self.pageSize));
        }
        if (pageContentLength > 0) {
          self.pageCount = Math.ceil(pageContentLength / self.pageSize);
        } else {
          self.pageCount = 1;
        }
        var hasPagination = (self.pageCount > 1);

        var pageArray = [];
        var p = 0;
        while (p < self.pageCount) {
          var pageObj = Ember.Object.create({
            number: ++p,
            active: (p === this.page)?'active':''
          });
          pageArray.pushObject(pageObj);
        }

        var hasPrevious = false;
        var hasNext = true;
        var previousPage = 0;
        var nextPage = 2;

        self.set('model', data);
        self.set('filteredData', data.allsales);
        self.set('pageCount', self.pageCount);
        self.set('pageArray', pageArray);
        self.set('hasPagination', hasPagination);
        self.set('hasPrevious', hasPrevious);
        self.set('hasNext', hasNext);
        self.set('previousPage', previousPage);
        self.set('nextPage', nextPage);
        self.set('selectedStatus.statusValue', 'all');
      });
    },

    paginate: function(page) {
      Ember.Logger.log('Entering list paginate');

      this.page = page;
      var filteredData = this.filteredData;
      var startContent = (page - 1) * this.pageSize;
      var endContent = page * this.pageSize;
      var pageCount = this.get('pageCount');
      var hasPrevious = (page > 1);
      var hasNext = (page < pageCount);
      var previousPage = page - 1;
      var nextPage = page + 1;

      var pageArray = [];
      var p = 0;
      while (p < pageCount) {
        var pageObj = Ember.Object.create({
          number: ++p,
          active: (p === this.page)?'active':''
        });
        pageArray.pushObject(pageObj);
      }

      this.set('pageContent', filteredData.slice(startContent, endContent));
      this.set('hasPrevious', hasPrevious);
      this.set('hasNext', hasNext);
      this.set('previousPage', previousPage);
      this.set('nextPage', nextPage);
      this.set('pageArray', pageArray);
    }
  }
});