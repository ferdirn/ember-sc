import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  chartOptions: {
    bezierCurve: false
  },

  model: function() {
    var start_date = this.get('start_date'), end_date = this.get('end_date');
    return Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/', {
      start_date: start_date,
      end_date: end_date
    });
  },

  actions: {
    filter: function() {
      var start_date = this.get('start_date'),
      end_date = this.get('end_date');
      var self = this;
      Ember.Logger.log('Filter sales from ' + start_date + ' to ' + end_date);
      Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport/', {
        start_date: start_date,
        end_date: end_date
      }).then(function(data) {
        self.set('model', data);
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