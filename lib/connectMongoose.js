'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// En case de error de conexión
mongoose.connection.on('error', err => {
    console.log('Oops, an error occurred trying to connect with MongoDB', err);
    process.exit(1);
});

// Cada vez que se abra una nueva conexión con la BBDD
mongoose.connection.once('open', () => {
    console.log('Conected to MongoDB at', mongoose.connection.name);
});

// Conexion a BBDD
mongoose.connect('mongodb://127.0.0.1/cursonode')

// Exportamos la conexión
module.exports = mongoose.connection;