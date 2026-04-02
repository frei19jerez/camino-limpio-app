module.exports = {

  tableName: 'lavado',

  attributes: {

    cliente: {
      model: 'cliente'
    },

    empleado: {
      model: 'empleado'
    },

    placa: {
      type: 'string',
      required: true,
      maxLength: 20
    },

    vehiculo: {
      type: 'string',
      maxLength: 20
    },

    precio: {
      type: 'number',
      required: true
    },

    fecha: {
      type: 'ref',
      columnType: 'date'
    },

    created_at: {
      type: 'ref',
      columnType: 'timestamp',
      autoCreatedAt: true
    },

    updated_at: {
      type: 'ref',
      columnType: 'timestamp',
      autoUpdatedAt: true
    }

  }

};