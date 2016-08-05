/* jshint node: true */

module.exports = function(environment) {
  var API_HOST = 'http://api.bilna.local';

  switch(environment) {
    case 'production':
      API_HOST = 'http://api.orami.co.id';
      break;

    case 'staging':
      API_HOST = 'http://stage.api.orami.co.id';
      break;

    case 'stagez':
      API_HOST = 'http://stagez.api.bilna.com';
      break;

    default:
      break;
  }

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
      API_HOST: API_HOST
    },
    pace: {
      theme: 'minimal',
      color: 'orange',

      // pace specific options. Copied from https://github.com/vectart/ember-cli-pace
      catchupTime: 50,
      initialRate: 0.01,
      minTime: 100,
      ghostTime: 50,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: true,
      restartOnPushState: true,
      restartOnRequestAfter: 500,
      target: 'body',
      elements: {
        checkInterval: 100,
        selectors: ['body', '.ember-view']
      },
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },
      ajax: {
        trackMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        trackWebSockets: true,
        ignoreURLs: []
      }

    }

  };

  ENV['ember-simple-auth'] = {
    store: 'ember-simple-auth-session-store:local-storage',
    authenticationRoute: 'auth.login',
    authorizer: 'authorizer:token',
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated: 'dashboard',
    crossOriginWhitelist: ['*']
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: API_HOST + '/api/auth/',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'MOXY ',
    authorizationHeaderName: 'Authorization',
    refreshAccessTokens: false,
    serverTokenRefreshEndpoint: API_HOST + '/api/token-refresh/',
    refreshLeeway: 300, // refresh token for 5 minutes. need to develop expiry
    timeFactor: 1000,
    headers: {}
  };

  ENV['contentSecurityPolicy'] = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline'",
    'font-src': "'self' http://fonts.gstatic.com",
    'connect-src': "'self' " + API_HOST,
    'img-src': "'self' data: " + API_HOST,
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = API_HOST;
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

  return ENV;
};
