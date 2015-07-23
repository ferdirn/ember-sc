export default Ember.Component.extend({

  tagName: 'canvas',
  attributeBindings: ['width', 'height'],
  setup: false,

  /**
   * Construction handler
   * This will create the canvas and check the given
   * input values since Chart.js can react pretty odd
   * when getting wrong and/or missing values.
   */
  didInsertElement: function(){
    var canvas  = this.get('element');
    var context = canvas.getContext('2d');

    canvas.width  = $(canvas).parent().width();
    canvas.height = $(canvas).parent().height();

    var labels = this.get('labels');
    var data = this.get('data');

    var chartData = {
        labels: labels,
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: data
            }
        ]
    };

    var type = this.get('type').charAt(0).toUpperCase() + this.get('type').slice(1);
    if (!type.match(/(Line|Bar|Radar|PolarArea|Pie|Doughnut)/)) { type = "Line"; }
    var options = (this.get('options') !== undefined) ? this.get('options') : {};

    this.setProperties({
      '_data': chartData,
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
  chartRender: function(){
    var chart = new Chart(this.get('_context'))[this.get('_type')](this.get('_data'),this.get('_options'));
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
  chartUpdate: function(){
    if(this.get('update') === true && this.get('setup') === true){
      this.chartRender();
    }
  }.observes('data', 'options'),

});