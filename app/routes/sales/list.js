import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import PageLoaderMixin from 'sellercenter/mixins/page-loader';
import config from '../../config/environment';

export default Ember.Route.extend(PageLoaderMixin, AuthenticatedRouteMixin, {
  page: 1,
  pageSize: 20,
  pageCount: 1,

  chartOptions: {
    bezierCurve: false
  },

  model: function() {
    return Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/');
  },

  setupController: function(controller, model) {
    var pageContent = model.allsales;
    var pageContentLength = pageContent.length;
    if (pageContentLength > this.pageSize) {
      pageContent = pageContent.slice(0, this.pageSize);
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

    controller.set('model', model);
    controller.set('filteredData', model.allsales);
    controller.set('pageContent', pageContent);
    controller.set('page', this.page);
    controller.set('pageSize', this.pageSize);
    controller.set('pageCount', this.pageCount);
    controller.set('pageArray', pageArray);
    controller.set('hasPagination', hasPagination);
    controller.set('hasPrevious', hasPrevious);
    controller.set('hasNext', hasNext);
    controller.set('previousPage', previousPage);
    controller.set('nextPage', nextPage);

    controller.set('chartOptions', this.chartOptions);
  }

});
