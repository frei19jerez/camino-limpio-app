/**
 * Production environment settings
 * (sails.config.*)
 */

module.exports = {

  datastores: {
    default: {
      // Si luego usas PostgreSQL o MySQL en producción,
      // aquí pondrás adapter y url.
    },
  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      // allowOrigins: [
      //   'https://tu-dominio.com',
      // ]
    },
  },

  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  },

  sockets: {
    // onlyAllowOrigins: [
    //   'https://tu-dominio.com',
    // ],
  },

  log: {
    level: 'debug',
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
    trustProxy: true,
  },

  port: process.env.PORT,

  custom: {
    baseUrl: 'https://camino-limpio-app.onrender.com',
    internalEmailAddress: 'support@example.com',
  },

};