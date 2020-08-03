// Toda la configuracion para la conexion de la base de datos
const Sequelize = require('sequelize');
// Acceder a las variables de entorno local
require('dotenv').config({ path: 'variables.env' });
// Leer las variables del entorno local
module.exports = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});