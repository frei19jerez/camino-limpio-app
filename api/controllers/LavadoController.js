module.exports = {

  crear: async function(req,res){

    try {

      let { nombreCliente, telefono, trabajador, placa, vehiculo, precio } = req.body

      precio = Number(precio)

      let cliente = null
      let empleado = null

      /* =========================
         CLIENTE
      ========================= */

      if(telefono){

        cliente = await Cliente.findOne({
          telefono: telefono
        })

        if(!cliente){

          cliente = await Cliente.create({
            nombre: nombreCliente || 'Cliente',
            telefono: telefono
          }).fetch()

        }

      }

      /* =========================
         EMPLEADO
      ========================= */

      if(trabajador){

        empleado = await Empleado.findOne({
          nombre: trabajador
        })

        if(!empleado){

          empleado = await Empleado.create({
            nombre: trabajador
          }).fetch()

        }

      }

      /* =========================
         LAVADO
      ========================= */

      const lavado = await Lavado.create({

        cliente: cliente ? cliente.id : null,
        empleado: empleado ? empleado.id : null,
        placa: placa.toUpperCase(),
        vehiculo,
        precio,
        fecha: new Date().toLocaleDateString()

      }).fetch()

      return res.redirect('/recibo/' + lavado.id)

    } catch(err){
      return res.serverError(err)
    }

  },


  recibo: async function(req,res){

    const lavado = await Lavado.findOne({
      id:req.params.id
    })
    .populate('cliente')
    .populate('empleado')

    if(!lavado){
      return res.notFound()
    }

    return res.view('pages/recibo',{
      lavado
    })

  },


  lista: async function(req,res){

    const lavados = await Lavado.find()
    .populate('cliente')
    .populate('empleado')

    return res.view('pages/lavados',{
      lavados
    })

  },


  panel: async function(req,res){

    const hoy = new Date().toLocaleDateString()

    const lavados = await Lavado.find({
      fecha: hoy
    })
    .populate('empleado')
    .populate('cliente')

    let total = 0
    let carros = 0
    let motos = 0

    const empleados = {}

    lavados.forEach(l => {

      const precio = Number(l.precio)

      total += precio

      if(l.vehiculo === 'carro'){
        carros++
      }

      if(l.vehiculo === 'moto'){
        motos++
      }

      if(l.empleado){

        const nombre = l.empleado.nombre

        if(!empleados[nombre]){
          empleados[nombre] = 0
        }

        empleados[nombre]++

      }

    })

    const pagoTrabajador = total * 0.35
    const gastos = 20000
    const gananciaAdmin = total - pagoTrabajador - gastos

    return res.view('pages/panel',{
      lavados,
      total,
      empleados,
      carros,
      motos,
      pagoTrabajador,
      gastos,
      gananciaAdmin
    })

  }

};