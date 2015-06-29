/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sellercenter',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://localhost:8000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth'] = {
    store: 'simple-auth-session-store:local-storage',
    authenticationRoute: 'auth.login',
    authorizer: 'simple-auth-authorizer:token',
    routeAfterAuthentication: 'dashboard',
    crossOriginWhitelist: ['*']
  };

  ENV['simple-auth-token'] = {
    serverTokenEndpoint: 'http://localhost:8000/api/auth/',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'MOXY ',
    authorizationHeaderName: 'Authorization',
    refreshAccessTokens: false,
    serverTokenRefreshEndpoint: 'http://localhost:8000/api/auth-refresh/',
    refreshLeeway: 300, // refresh token for 5 minutes. need to develop expiry
    timeFactor: 1000,
    headers: {}
  };

  ENV['contentSecurityPolicy'] = {
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self'",
    'connect-src': "http://localhost:8000",
    'img-src': "'self'",
    'style-src': "'self'",
    'media-src': "'self'"
  };

  return ENV;
};
