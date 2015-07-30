import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  pageSize: 20,

  chartOptions: {
    bezierCurve: false
  },

  addDays: function(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  },

  actions: {
    filter: function() {
      var self = this;
      var start_date = this.get('start_date'), end_date = this.get('end_date');
      var d = new Date(end_date);
      d = this.addDays(d, 1);
      end_date = d.toISOString().slice(0,10);
      Ember.Logger.log('Filter sales from ' + start_date + ' to ' + end_date);
      Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/', {
        start_date: start_date,
        end_date: end_date
      }).then(function(data) {
        Ember.Logger.log(data);
        Ember.Logger.log('begin');
        var pageContent = data.allsales.slice(0, 20);
        Ember.Logger.log(pageContent);
        self.set('model', data);
        self.set('pageContent', pageContent);
      });
    },

    paginate: function(page) {
        Ember.Logger.log(page);

        var model = this.get('model');
        var allsales = model.allsales;

        Ember.Logger.log(allsales);
    }
  }
});