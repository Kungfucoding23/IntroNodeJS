// Se trae los datos del modelo y le dice a la vista que quiere mostrar
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');
exports.consultasHomePage = async(req, res) => {
    const viajes = await Viaje.findAll({ limit: 3 });
    const testimoniales = await Testimonial.findAll({ limit: 3 });

    res.render('index', {
        pagina: 'Próximos Viajes',
        clase: 'home',
        //propiedades para acceder
        viajes,
        testimoniales
    });
}