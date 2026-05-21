module.exports = {

  crear: async function(req, res) {

    try {

      sails.log.info('🤖 IA Camino Limpio: Recibiendo datos del formulario...');
      sails.log.info('📦 Body recibido:', req.body);

      let {
        cliente: nombreCliente,
        telefono,
        empleado: trabajador,
        placa,
        vehiculo,
        precio
      } = req.body;

      if (!nombreCliente || !telefono || !trabajador || !placa || !vehiculo || !precio) {
        sails.log.warn('⚠️ IA Camino Limpio: Faltan datos obligatorios.');
        return res.badRequest('Faltan datos para generar el recibo.');
      }

      precio = Number(precio);

      let cliente = null;
      let empleado = null;

      sails.log.info('👤 IA Camino Limpio: Buscando o creando cliente...');

      cliente = await Cliente.findOne({
        telefono: telefono
      });

      if (!cliente) {

        cliente = await Cliente.create({
          nombre: nombreCliente || 'Cliente',
          telefono: telefono
        }).fetch();

        sails.log.info('✅ Cliente creado:', cliente.nombre);

      } else {
        sails.log.info('✅ Cliente encontrado:', cliente.nombre);
      }

      sails.log.info('👷 IA Camino Limpio: Buscando o creando empleado...');

      empleado = await Empleado.findOne({
        nombre: trabajador
      });

      if (!empleado) {

        empleado = await Empleado.create({
          nombre: trabajador
        }).fetch();

        sails.log.info('✅ Empleado creado:', empleado.nombre);

      } else {
        sails.log.info('✅ Empleado encontrado:', empleado.nombre);
      }

      sails.log.info('🚗 IA Camino Limpio: Creando lavado...');

      const lavado = await Lavado.create({
        cliente: cliente ? cliente.id : null,
        empleado: empleado ? empleado.id : null,
        placa: placa.toUpperCase(),
        vehiculo,
        precio,
        fecha: new Date().toLocaleDateString('es-CO')
      }).fetch();

      sails.log.info('✅ IA Camino Limpio: Recibo creado correctamente. ID:', lavado.id);

      return res.redirect('../recibo/' + lavado.id);

    } catch(err) {

      sails.log.error('❌ IA Camino Limpio: Error creando lavado.');
      sails.log.error(err);

      return res.serverError(err);

    }

  },


  recibo: async function(req, res) {

    try {

      sails.log.info('🧾 IA Camino Limpio: Buscando recibo ID:', req.params.id);

      const lavado = await Lavado.findOne({
        id: req.params.id
      })
      .populate('cliente')
      .populate('empleado');

      if (!lavado) {
        sails.log.warn('⚠️ IA Camino Limpio: Recibo no encontrado.');
        return res.notFound();
      }

      sails.log.info('✅ IA Camino Limpio: Recibo encontrado.');

      return res.view('pages/recibo', {
        lavado
      });

    } catch(err) {

      sails.log.error('❌ IA Camino Limpio: Error mostrando recibo.');
      sails.log.error(err);

      return res.serverError(err);

    }

  },


  lista: async function(req, res) {

    try {

      sails.log.info('📋 IA Camino Limpio: Listando lavados...');

      const lavados = await Lavado.find()
      .populate('cliente')
      .populate('empleado');

      return res.view('pages/lavados', {
        lavados
      });

    } catch(err) {

      sails.log.error('❌ IA Camino Limpio: Error listando lavados.');
      sails.log.error(err);

      return res.serverError(err);

    }

  },


  panel: async function(req, res) {

    try {

      sails.log.info('📊 IA Camino Limpio: Cargando panel administrativo...');

      const hoy = new Date().toLocaleDateString('es-CO');

      const lavados = await Lavado.find({
        fecha: hoy
      })
      .populate('empleado')
      .populate('cliente');

      let total = 0;
      let carros = 0;
      let motos = 0;

      const empleados = {};

      lavados.forEach(l => {

        const precio = Number(l.precio);

        total += precio;

        if (l.vehiculo === 'carro') {
          carros++;
        }

        if (l.vehiculo === 'moto') {
          motos++;
        }

        if (l.empleado) {

          const nombre = l.empleado.nombre;

          if (!empleados[nombre]) {
            empleados[nombre] = 0;
          }

          empleados[nombre]++;

        }

      });

      const pagoTrabajador = total * 0.35;
      const gastos = 20000;
      const gananciaAdmin = total - pagoTrabajador - gastos;

      sails.log.info('✅ IA Camino Limpio: Panel cargado correctamente.');
      sails.log.info('💰 Total:', total);
      sails.log.info('🚗 Carros:', carros);
      sails.log.info('🏍 Motos:', motos);

      return res.view('pages/panel', {
        lavados,
        total,
        empleados,
        carros,
        motos,
        pagoTrabajador,
        gastos,
        gananciaAdmin
      });

    } catch(err) {

      sails.log.error('❌ IA Camino Limpio: Error cargando panel.');
      sails.log.error(err);

      return res.serverError(err);

    }

  }

};