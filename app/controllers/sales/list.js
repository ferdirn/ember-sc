import config from '../../config/environment';

export default Ember.Controller.extend({
    model: function() {
        var start_date = this.get('start_date'), end_date = this.get('end_date');
        return Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport', {
            start_date: start_date,
            end_date: end_date
        });
    },
    actions: {
        filter: function() {
            var start_date = this.get('start_date'),
                end_date = this.get('end_date');
            var self = this;
            Ember.$.getJSON(config.APP.API_HOST + '/api/salesreport', {
                start_date: start_date,
                end_date: end_date
            }).then(function(data) {
                self.set('model', data);
            });
        }
    }
});