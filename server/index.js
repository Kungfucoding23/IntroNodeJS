/* 
    Este archivo cuenta con toda la parte de configuración
    en el decimos que vamos a utilizar express, que carpetas 
    van a contener las vistas, que carpetas el public
    crear algunas variables locales que podemos pasar a algunos
    archivos y templates
*/
// Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');
require('dotenv').config({ path: 'variables.env' });

//Autenticar db
db.authenticate()
    .then(() => console.log('DB conectada!'))
    .catch(error => console.log(error))



// Configurar express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar una carpeta estatica llamada public
app.use(express.static('public'));

// Validar si estamos en desarrollo o en producción
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    // Midle wear
    return next();
});

// Ejecutamos el body parser
app.use(bodyParser.urlencoded({ extend: true }));

// Cargar las rutas
app.use('/', routes());

/* Puerto y Host para la app */
// Lee el HOST y en caso de que no exista le asignamos la direccion 0.0.0.0 que
// no es una direccion valida pero Heroku la va a detectar y le va a asignar una
const host = process.env.HOST || '0.0.0.0';
// esta variable de entorno la va a generar e inyectar automaticamente Heroku
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando!');
});