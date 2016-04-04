// import Ember from 'ember';
import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
// import config from '../config/environment';

export default AutoComplete.extend({
  valueProperty: "order_number",
  suggestions: function() {
    var inputVal = this.get("inputVal") || "";
    return this.get("options").filter(function(item) {
      //return item.get('code').toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
      return item.order_number.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
    });
  }.property("inputVal", "options.@each"),
  optionsToMatch: function() {
    var caseInsensitiveOptions = [];
    this.get("options").forEach(function(item) {
      var value = item;
      caseInsensitiveOptions.push(value);
      caseInsensitiveOptions.push(value.toLowerCase());
      /*
      Ember.$.getJSON(config.APP.API_HOST + '/api/warehous-item-shipment/').then(function(data) {
        console.log(data.get('order_ids'));
      });
      */
      return caseInsensitiveOptions;
    }).property("options.@each");
  }
});
