/**MODELO DE ADS */
'use strict';

// Hacemos requier la librería mongoose
const mongoose = require('mongoose');

// Definimos el esquema de los anuncios
const adSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        index: true,
    },
    onSale: { 
        type: Boolean, 
        required: true,
        index: true, 
    },
    price:{ 
        ype: Number, 
        required: true,
        index: true, 
    },
    photo:{ 
        type: String, 
        required: true 
    },
    // He cambiado los tags por estos otros
    tags: [{ 
        type: String, 
        enum: ['cooking', 'sports', 'hoobies', 'tech'],
        index: true,
    }],
    // Añadimos la fecha para poder clasificarlo por fecha de creación
    created: { 
        type: Date, 
        default: Date.now,
        index: true, 
    }
});

adSchema.statics.list = function(filter, skip, limit, fields, sort) {
    // Creamos la consulta
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    // Ejecutamos la consulta, y retornamos la promesa
    return query.exec()
}

// Creamos el modelo
const Ad = mongoose.model('Ad', adSchema);

// Exportamos el modelo
module.exports = Ad;
