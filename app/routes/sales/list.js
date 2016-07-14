import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  chartOptions: {
    bezierCurve: false,
    tooltipTitleFontSize: 44,
    scaleLabel: function(label){
      return  'Rp ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    tooltipTemplate: function(label){
      return  ' Rp ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },

  page: 1,
  pageSize: 20,
  pageCount: 1,
  pageContent: null,

  selectedStatus: {
    statusValue: "all"
  },

  model: function() {
    this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
      headers = {};
      headers[headerName] = headerValue;
      Ember.$.ajaxSetup({headers});
    });
    return Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/');
  },

  setupController: function(controller, model) {
    Ember.Logger.log('Entering list route.setupController');

    var allsales = model.allsales;
    this.pageContent = allsales;
    var pageContentLength = this.pageContent.length;
    if (pageContentLength > this.pageSize) {
      this.pageContent = this.pageContent.slice(0, this.pageSize);
    }
    if (pageContentLength > 0) {
      this.pageCount = Math.ceil(pageContentLength / this.pageSize);
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

    var formatted_date = model.chart.labels.map(function(label) {
      return moment(label).format('ddd, D MMM YYYY');
    });
    console.log(formatted_date);
    model.chart.labels = formatted_date;

    controller.set('model', model);
    controller.set('filteredData', allsales);
    controller.set('pageContent', this.pageContent);
    controller.set('page', this.page);
    controller.set('pageSize', this.pageSize);
    controller.set('pageCount', this.pageCount);
    controller.set('pageArray', pageArray);
    controller.set('selectedStatus', this.selectedStatus);
    controller.set('hasPagination', hasPagination);
    controller.set('hasPrevious', hasPrevious);
    controller.set('hasNext', hasNext);
    controller.set('previousPage', previousPage);
    controller.set('nextPage', nextPage);

    controller.set('chartOptions', this.chartOptions);

  }

});
