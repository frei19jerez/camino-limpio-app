/**
 * Production environment settings
 * (sails.config.*)
 */

module.exports = {

  datastores: {
    default: {

      // 🔥 Temporal para DemoFlow Runtime
      // Evita errores de PostgreSQL mientras pruebas deploy automático
      adapter: 'sails-disk'

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

      // 🔥 Permitir DemoFlow
      allowOrigins: [
        'https://demoflowapp.com',
        'https://www.demoflowapp.com',
        'http://localhost:1337',
        'http://127.0.0.1:1337'
      ]

    },
  },

  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,

      // Importante detrás de proxies
      secure: false
    },
  },

  sockets: {

    // 🔥 NECESARIO EN PRODUCCIÓN
    onlyAllowOrigins: [
      'https://demoflowapp.com',
      'https://www.demoflowapp.com',
      'http://localhost:1337',
      'http://127.0.0.1:1337'
    ],

  },

  log: {
    level: 'debug',
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,

    // Necesario para Render / DemoFlow
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