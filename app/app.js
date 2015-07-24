import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});


/* TODO: This can be removed in favor of ember-truth-helpers.
 * One can use the following options with ember-truth-helpers:
 * {{#if (eq val1 val2)}} {{/if}}
 * {{#if (not-eq val1 val2)}} {{/if}}
 * {{#if (not val1)}} {{/if}}
 * {{#if (and val1 val2)}} {{/if}}
 * {{#if (or val1 val2)}} {{/if}}
 * {{#if (gte val1 val2)}} {{/if}}
 * {{#if (lte val1 val2)}} {{/if}}
 * {{#if (is-array val1)}} {{/if}}
 */

Ember.Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
loadInitializers(App, config.modulePrefix);

export default App;
