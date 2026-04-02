module.exports = {

  tableName: 'cliente',

  attributes: {

    nombre: {
      type: 'string',
      required: true
    },

    telefono: {
      type: 'string'
    },

    lavados: {
      collection: 'lavado',
      via: 'cliente'
    }

  }

};