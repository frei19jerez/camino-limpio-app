module.exports = {

  crear: async function(req,res){

    const { nombre, cargo } = req.body

    const empleado = await Empleado.create({
      nombre,
      cargo
    }).fetch()

    return res.json(empleado)

  }

};