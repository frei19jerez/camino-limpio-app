module.exports.routes = {

  '/': async function(req, res) {
    return res.send('Servidor funcionando en Render 🔥');
  },

  'POST /lavado/crear': 'LavadoController.crear',

  'GET /recibo/:id': 'LavadoController.recibo',

  'GET /panel': 'LavadoController.panel',

};