const Viaje = require('../models/Viajes');
exports.mostrarViajes = async(req, res) => {
    //findAll retorna todos los resultados de la base de datos
    // aplicando async/await
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        //propiedad para acceder
        viajes
    });
}

exports.mostrarViaje = async(req, res) => {
    // aplicando async/await... Esto mejora el performance
    const viaje = await Viaje.findByPk(req.params.id)
        // await detiene que esta linea se ejecute hasta que no se 
        // traiga los resultados de la base de datos, por eso el
        // performance es mayor
    res.render('viaje', {
        viaje
    });
}