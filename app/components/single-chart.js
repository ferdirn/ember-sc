import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'canvas',
  attributeBindings: ['width', 'height'],
  setup: false,

    /**
    * Construct chart data
    */
    getChartData: function() {
      var labels = this.get('labels');
      var data = this.get('data');

      var chartData = {
        labels: labels,
        datasets: [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,0.8)",
          highlightFill : "rgba(151,187,205,0.75)",
          highlightStroke : "rgba(151,187,205,1)",
          data: data
        }
        ]
      };

      return chartData;
    },

    /**
    * Construction handler
    * This will create the canvas and check the given
    * input values since Chart.js can react pretty odd
    * when getting wrong and/or missing values.
    */
    didInsertElement: function() {
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.tooltipTemplate = "<%= value %>";

      var canvas  = this.get('element');
      var context = canvas.getContext('2d');

      canvas.width  = $(canvas).parent().width();
      canvas.height = $(canvas).parent().height();

      var type = this.get('type').charAt(0).toUpperCase() + this.get('type').slice(1);
      if (!type.match(/(Line|Bar|Radar|PolarArea|Pie|Doughnut)/)) { type = "Line"; }
      var options = (this.get('options') !== undefined) ? this.get('options') : {};

      this.setProperties({
        '_data': this.getChartData(),
        '_type': type,
        '_canvas':  canvas,
        '_context': context,
        '_options': options
      });
      this.chartRender();
    },

    /**
    * Render the chart to the canvas
    * This function is separated from the event hook to
    * allow data overwriting which more or less results
    * in updating the chart.
    */
    chartRender: function() {
      var chart = this.get('_chart');
      if (chart !== undefined) {
        chart.destroy();
      }
      chart = new Chart(this.get('_context'))[this.get('_type')](this.get('_data'),this.get('_options'));
      this.setProperties({
        '_chart': chart,
        'setup': true
      });
    },

    /**
    * Chart Update Handler
    * This will re-render the chart whenever its data or
    * options changes, if the 'update' property is set to true
    */
    chartUpdate: function() {
      if(this.get('update') === true && this.get('setup') === true){
        console.log('sales-chart has been updated');
        this.setProperties({
          '_data': this.getChartData(),
          '_options': this.get('options')
        });
        this.chartRender();
      }
    }.observes('data', 'options'),

  });