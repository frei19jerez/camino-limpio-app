module.exports = {

  crear: async function(req,res){

    const { nombre, telefono } = req.body

    const cliente = await Cliente.create({
      nombre,
      telefono
    }).fetch()

    return res.json(cliente)

  }

};