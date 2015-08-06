import Ember from 'ember';
import config from "../../config/environment";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default /*Ember.ArrayController.extend({ */Ember.Controller.extend({
  /*
  queryParams: ["page", "perPage"],

  page: 1,
  perPage: 10,
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  pagedContent: pagedArray("content", {infinite: true}),
         //
         //         // can be called anything, I've called it pagedContent
         //           // remember to iterate over pagedContent in your template
  //pagedContent: pagedArray('content', {pageBinding: "page", perPageBinding: "perPage"}),
         //
         //               // binding the property on the paged array
         //                 // to a property on the controller
 //totalPagesBinding: "pagedContent.totalPages",
 */

  // init: function() {

  //   var products;
  //   var self = this;
  //   Ember.$.getJSON(config.APP.API_HOST + '/api/product/list/').then(function(data) {
  //       products = data;
  //       //data = pagedArray(data, {pageBinding: "page", perPageBinding: "perPage"});
  //       self.set('products', data);
  //   });

  // }
});
