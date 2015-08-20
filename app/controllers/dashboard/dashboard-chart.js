import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  chartOptions: {
    bezierCurve: false,
    animation: false,
    scaleLabel: function(label){
      return  'Rp ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    multiTooltipTemplate: function(label){
      return  label.datasetLabel + ' : Rp ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },

  init: function() {
    this._super();

    var self = this;
    var promise = Ember.$.getJSON(config.APP.API_HOST + '/api/dashboardchart/');
    if (promise) {
      promise.done(function(data) {
        var formatted_date = data.labels.map(function(label) {
          return moment(label).format('ddd, D MMM YYYY');
        });
        data.labels = formatted_date;
        self.set('data', data);
      });
      return this.set('promise', promise);
    }
  }
});
 