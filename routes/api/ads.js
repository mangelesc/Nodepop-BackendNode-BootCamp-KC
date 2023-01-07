/**DESARROLLO DE LA API */
'use strict';

const express = require('express');
const createError = require('http-errors');

const Ad = require('../../models/Ad');

const router = express.Router();

/** CRUD
 * Create-Read-Update-Delete
*/

// GET /api/ads
// Devolvemos una lista de ads
router.get('/', async (req, res, next) => {
    try {
        // Filtros
        const name = req.query.name;
        const onSale = req.query.onSale;
        const price = req.query.price;
        const tags = req.query.tags;
        const created =  req.query.created;

        // Paginación
        const skip = req.query.skip;
        const limit = req.query.limit;

        // Selección de campos
        const fields = req.query.fields;

        // Ordenación
        const sort = req.query.sort;

        // Si no se especifica ningún filter, devolverá todos los ads
        const filter = {}; 

        // Si se esecifica algñun filter, devolverá los correspondiendtes
        if (name) { // /api/ads?name=Smith
        filter.name = new RegExp ('^' + req.query.nombre, "i");;
        }

        if (onSale) { // /api/ads?onSale=true
        filter.onSale = onSale;
        }

        if (price) { // /api/ads?price=32
        filter.age = price;
        }

//         if (tags) { // /api/ads?age=32
//         filter.tags = tags;
//         }

// // ************************************************************************
//         // Filtrar por rango de fecha
//         if (created) { // /api/ads?age=32
//         filter.created = created;
//         }

        const ads = await Ad.lista(filter, skip, limit, fields, sort);

        // Respondemos con un objeto JSON
        res.json({ results: ads });

    } catch(err) {
        // Si falla la promesa, la capturamos 
        next(err);
    }
});

// GET /api/ads/(id)
// Devolvemos un ad
router.get('/:id', async (req, res, next) => {
    try {
        // Leemos el aprametro de entrada y lo metemos en una variable
        const id = req.params.id;

        // Buscamos un ad en la BD
        const ad = await Ad.findById(id);

        res.json({ result: ad });

    } catch (err) {
        next(err);
    }
});

// PUT /api/ads/(id) (body=adData)
// Actualizamos un ad
router.put('/:id', async (req, res, next) => {
    try {
        // Recogemos el id en una variable
        const id = req.params.id;
        // Recogemos la info del body que se quiere modificar
        const adData = req.body;

        // Actualizamos con findOneAndUpdate
        const adUpdated = await Ad.findOneAndUpdate({ _id: id}, adData, {
        new: true // Objeto de opciones -> esto hace que nos devuelva el documento actualizado
        });

        // Devolvemos el ad actualizado, así se obtiene una respuesta de cómo ha quedao el ad
        res.json({ result: adUpdated });

    } catch (err) {
        next(err);
    }
});

// POST /api/ads (body=adData)
// Creamos un ad
router.post('/', async (req, res, next) => {
    try {

        const adData = req.body;

        // Instanciamos un nuevo ad en memoria
        const ad = new Ad(adData);

        // Guardamos el ad en la base de datos
        const adSaved = await ad.save();

        res.json({ result: adSaved });

    } catch (err) {
        next(err);
    }
});

// DELETE /api/ads/:id
// Eliminamos un ad
router.delete('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        const ad = await Ad.findById(id);

        //Una vez borrado, si se vuelve a intentar borrar, lanzamos un error NotFound
        if (!ad) {
            return next(createError(404));
        }

        await Ad.deleteOne({ _id: id });

        // Respondemos sólo con el código 200
        res.json();

    } catch (err) {
        next(err);
    }
});

// Exportamos el router, ya que lo usaré en app.js para que la app lo utilice
module.exports = router;