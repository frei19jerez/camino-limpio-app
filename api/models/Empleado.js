module.exports = {

  tableName: 'empleado',

  attributes: {

    nombre: {
      type: 'string',
      required: true
    },

    cargo: {
      type: 'string'
    },

    lavados: {
      collection: 'lavado',
      via: 'empleado'
    }

  }

};