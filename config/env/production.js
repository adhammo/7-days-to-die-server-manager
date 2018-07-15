/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API keys / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

 const winston = require('winston');

 customLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      timestamp: true,
      humanReadableUnhandledException: true
    }),
    new winston.transports.File({
      level: 'info',
      name: 'infolog',
      timestamp: true,
      humanReadableUnhandledException: true,
      filename: './logs/prod.log',
      tailable: true,
      maxsize: 1000,
      maxFiles: 3,
      json: false,
      colorize: true
    }),
    new winston.transports.File({
      level: 'debug',
      name: 'debuglog',
      timestamp: true,
      humanReadableUnhandledException: true,
      filename: './logs/debug.log',
      tailable: true,
      maxsize: 1000,
      maxFiles: 5,
      json: false,
      colorize: true
    })
  ]
})

module.exports = {


  /**************************************************************************
     *                                                                         *
     * Tell Sails what database(s) it should use in production.                *
     *                                                                         *
     * (https://sailsjs.com/config/datastores)                                 *
     *                                                                         *
     **************************************************************************/
  datastores: {

    /***************************************************************************
         *                                                                          *
         * Configure your default production database.                              *
         *                                                                          *
         * 1. Choose an adapter:                                                    *
         *    https://sailsjs.com/plugins/databases                                 *
         *                                                                          *
         * 2. Install it as a dependency of your Sails app.                         *
         *    (For example:  npm install sails-mysql --save)                        *
         *                                                                          *
         * 3. Then pass it in, along with a connection URL.                         *
         *    (See https://sailsjs.com/config/datastores for help.)                 *
         *                                                                          *
         ***************************************************************************/
    default: {
      adapter: 'sails-mysql',
      url: process.env.DBSTRING
    },

  },



  models: {

    /***************************************************************************
         *                                                                          *
         * To help avoid accidents, Sails automatically sets the automigration      *
         * strategy to "safe" when your app lifts in production mode.               *
         * (This is just here as a reminder.)                                       *
         *                                                                          *
         * More info:                                                               *
         * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
         *                                                                          *
         ***************************************************************************/
    migrate: 'safe',

    /***************************************************************************
         *                                                                          *
         * If, in production, this app has access to physical-layer CASCADE         *
         * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
         * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
         * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
         * choose to keep this enabled.)                                            *
         *                                                                          *
         ***************************************************************************/
    // cascadeOnDestroy: false,

  },



  /**************************************************************************
     *                                                                         *
     * Always disable "shortcut" blueprint routes.                             *
     *                                                                         *
     * > You'll also want to disable any other blueprint routes if you are not *
     * > actually using them (e.g. "actions" and "rest") -- but you can do     *
     * > that in `config/blueprints.js`, since you'll want to disable them in  *
     * > all environments (not just in production.)                            *
     *                                                                         *
     ***************************************************************************/
  blueprints: {
    shortcuts: false,
  },

  /***************************************************************************
     *                                                                          *
     * Configure your security settings for production.                         *
     *                                                                          *
     * IMPORTANT:                                                               *
     * If web browsers will be communicating with your app, be sure that        *
     * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
     * in the `config/security.js` file (not here), so that CSRF app can be     *
     * tested with CSRF protection turned on in development mode too.           *
     *                                                                          *
     ***************************************************************************/
  security: {

    /***************************************************************************
         *                                                                          *
         * If this app has CORS enabled (see `config/security.js`) with the         *
         * `allowCredentials` setting enabled, then you should uncomment the        *
         * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
         * to send cross-domain (CORS) requests to your Sails app.                  *
         *                                                                          *
         * > Replace "https://example.com" with the URL of your production server.  *
         * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
         *                                                                          *
         ***************************************************************************/
    cors: {
      allowOrigins: [
        process.env.CSMM_HOSTNAME
      ]
    },

  },


  /***************************************************************************
     *                                                                          *
     * Configure how your app handles sessions in production.                   *
     *                                                                          *
     * (https://sailsjs.com/config/session)                                     *
     *                                                                          *
     * > If you have disabled the "session" hook, then you can safely remove    *
     * > this section from your `config/env/production.js` file.                *
     *                                                                          *
     ***************************************************************************/
  session: {

    /***************************************************************************
         *                                                                          *
         * Production session store configuration.                                  *
         *                                                                          *
         * Uncomment the following lines to set up a production session store       *
         * package called "connect-redis" that will use Redis to share session      *
         * data across a cluster of multiple Sails/Node.js servers or processes.    *
         * (See http://bit.ly/redis-session-config for more info.)                  *
         *                                                                          *
         * > While "connect-redis" is a popular choice for Sails apps, many other   *
         * > compatible packages (like "connect-mongo") are available on NPM.       *
         * > (For a full list, see https://sailsjs.com/plugins/sessions)            *
         *                                                                          *
         ***************************************************************************/
        adapter: "@sailshq/connect-redis",
        host:'127.0.0.1',
        port: '6379',
        db: "1",

    /***************************************************************************
         *                                                                          *
         * Production configuration for the session ID cookie.                      *
         *                                                                          *
         * Tell browsers (or other user agents) to ensure that session ID cookies   *
         * are always transmitted via HTTPS, and that they expire 24 hours after    *
         * they are set.                                                            *
         *                                                                          *
         * Note that with `secure: true` set, session cookies will _not_ be         *
         * transmitted over unsecured (HTTP) connections. Also, for apps behind     *
         * proxies (like Heroku), the `trustProxy` setting under `http` must be     *
         * configured in order for `secure: true` to work.                          *
         *                                                                          *
         * > While you might want to increase or decrease the `maxAge` or provide   *
         * > other options, you should always set `secure: true` in production      *
         * > if the app is being served over HTTPS.                                 *
         *                                                                          *
         * Read more:                                                               *
         * https://sailsjs.com/config/session#?the-session-id-cookie                *
         *                                                                          *
         ***************************************************************************/
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },

  },



  /**************************************************************************
     *                                                                          *
     * Set up Socket.io for your production environment.                        *
     *                                                                          *
     * (https://sailsjs.com/config/sockets)                                     *
     *                                                                          *
     * > If you have disabled the "sockets" hook, then you can safely remove    *
     * > this section from your `config/env/production.js` file.                *
     *                                                                          *
     ***************************************************************************/
  sockets: {

    /***************************************************************************
         *                                                                          *
         * Uncomment the `onlyAllowOrigins` whitelist below to configure which      *
         * "origins" are allowed to open socket connections to your Sails app.      *
         *                                                                          *
         * > Replace "https://example.com" with the URL of your production server.  *
         * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
         *                                                                          *
         ***************************************************************************/
    onlyAllowOrigins: [
      process.env.CSMM_HOSTNAME
    ],


    /***************************************************************************
         *                                                                          *
         * If you are deploying a cluster of multiple servers and/or processes,     *
         * then uncomment the following lines.  This tells Socket.io about a Redis  *
         * server it can use to help it deliver broadcasted socket messages.        *
         *                                                                          *
         * > Be sure you have a compatible version of socket.io-redis installed!    *
         * > (See https://sailsjs.com/config/sockets for the latest version info)   *
         *                                                                          *
         * (https://sailsjs.com/docs/concepts/deployment/scaling)                   *
         *                                                                          *
         ***************************************************************************/
    // adapter: 'socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/dbname',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_sockets__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/
    // ```
    //--------------------------------------------------------------------------

  },



  /**************************************************************************
     *                                                                         *
     * Set the production log level.                                           *
     *                                                                         *
     * (https://sailsjs.com/config/log)                                        *
     *                                                                         *
     ***************************************************************************/



  log: {
    // Pass in our custom logger, and pass all log levels through.
    custom: customLogger,

    //  Disable captain's log so it doesn't prefix or stringify our meta data.
    inspect: false
   },



  http: {

    /***************************************************************************
         *                                                                          *
         * The number of milliseconds to cache static assets in production.         *
         * (the "max-age" to include in the "Cache-Control" response header)        *
         *                                                                          *
         ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
         *                                                                          *
         * Proxy settings                                                           *
         *                                                                          *
         * If your app will be deployed behind a proxy/load balancer - for example, *
         * on a PaaS like Heroku - then uncomment the `trustProxy` setting below.   *
         * This tells Sails/Express how to interpret X-Forwarded headers.           *
         *                                                                          *
         * This setting is especially important if you are using secure cookies     *
         * (see the `cookies: secure` setting under `session` above) or if your app *
         * relies on knowing the original IP address that a request came from.      *
         *                                                                          *
         * (https://sailsjs.com/config/http)                                        *
         *                                                                          *
         ***************************************************************************/
    trustProxy: true,

    express: {

        serverOptions : {

            key:  require('fs').readFileSync('/home/csmm/ssl/privkey.pem'),

            cert: require('fs').readFileSync('/home/csmm/ssl/cert.pem'),

        }

    }


  },



  /**************************************************************************
     *                                                                         *
     * Lift the server on port 80.                                             *
     * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
     * probably don't need to set a port here, because it is oftentimes        *
     * handled for you automatically.  If you are not sure if you need to set  *
     * this, just try deploying without setting it and see if it works.)       *
     *                                                                         *
     ****************************************************************************/
   port: process.env.CSMM_PORT,
   explicitHost: process.env.CSMM_IP,


  /**************************************************************************
     *                                                                         *
     * Configure an SSL certificate                                            *
     *                                                                         *
     * For the safety of your users' data, you should use SSL in production.   *
     * ...But in many cases, you may not actually want to set it up _here_.    *
     *                                                                         *
     * Normally, this setting is only relevant when running a single-process   *
     * deployment, with no proxy/load balancer in the mix.  But if, on the     *
     * other hand, you are using a PaaS like Heroku, you'll want to set up     *
     * SSL in your load balancer settings (usually somewhere in your hosting   *
     * provider's dashboard-- not here.)                                       *
     *                                                                         *
     * > For more information about configuring SSL in Sails, see:             *
     * > https://sailsjs.com/config/*#?ssl-configuration-example               *
     *                                                                         *
     **************************************************************************/


  ssl: {
    ca: require('fs').readFileSync(require('path').resolve(__dirname,'/home/csmm/ssl/chain.pem')),
     key: require('fs').readFileSync(require('path').resolve(__dirname,'/home/csmm/ssl/privkey.pem')),
     cert: require('fs').readFileSync(require('path').resolve(__dirname,'/home/csmm/ssl/cert.pem'))
   },



  /**************************************************************************
     *                                                                         *
     * Overrides for any custom configuration specifically for your app.       *
     * (for example, production API keys)                                      *
     *                                                                         *
     ***************************************************************************/
  custom: {

    // mailgunApiKey: 'key-prod_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sails_custom__mailgunApiKey=key-prod_fake_bd32301385130a0bafe030c
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

    discordFeedbackChannel : "442326331372601344",

  },



};
