/**
 * Production environment settings
 * (sails.config.*)
 */

module.exports = {

  datastores: {
    default: {

      adapter: 'sails-postgresql',

      url: process.env.DATABASE_URL,

      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false

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

      // Importante para DemoFlow y proxies
      secure: false
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

    // Necesario detrás de Render / Proxy
    trustProxy: true,
  },

  // 🔥 IMPORTANTE PARA DEMOFLOW
  port: process.env.PORT || 1337,

  custom: {

    // URL dinámica
    baseUrl:
      process.env.BASE_URL ||
      'https://demoflowapp.com/runtime/camino-limpio',

    internalEmailAddress: 'support@example.com',
  },

};