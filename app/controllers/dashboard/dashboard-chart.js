import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  chartOptions: {
      bezierCurve: false,
      animation: false,
      scaleLabel: function(label){
        return  'Rp ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
  },

  init: function() {
    this._super();

    var self = this;
    var promise = Ember.$.getJSON(config.APP.API_HOST + '/api/dashboardchart/');
    if (promise) {
      promise.done(function(data) {
        self.set('data', data);
      });
      return this.set('promise', promise);
    }
  }
});
