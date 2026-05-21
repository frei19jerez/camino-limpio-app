module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },

  'POST /lavado/crear': 'LavadoController.crear',

  'GET /recibo/:id': 'LavadoController.recibo',

  'GET /panel': 'LavadoController.panel',

};