/**Herramineta de linea de comandos*/
// Inicializar la base datos con los datos mínimos
const readline = require('readline');

// Cargamos el modelo Ad
const Ad = require('./models/Ad');

// Función main
async function main() {

    // Preguntamos al usuario si está seguro de borrar la BBDD
    const question_continue = await questionYN("You're going to DELETE THE DATABASE, are you sure you want to delete it? Answer yes or no [n]") //[n] -> valor por defecto
    if (!question_continue) {
        process.exit();
    }

    // Conectamos a la base de datos
    const connection = require('./lib/connectMongoose')

    // Inicializamos la colección de ad
    await initAds();

    // Desconectamos de la base de datos
    connection.close();
}

// Recojo algún posible error
main().catch(err => console.log('Oops, an error ocurred', err));

// Inicializamos el modelo de ad, añadiendo algunos registros y borrando si había algunos anteriores
async function initAds() {
    // Borramos todos los documentos de la colección de ads
    const result = await Ad.deleteMany();
    console.log(`${result.deletedCount} ads deleted from de DataBase.`);

    // Creamos algunos ads iniciales
    const inserted = await Ad.insertMany([
        {   name: 'Scooter',
            onSale: true,
            price: 250,
            photo: 'scooter.jpg',
            tags: ['hobbies', 'sports']
        },
        {   name: 'Thermomix',
            onSale: true,
            price: 500,
            photo: 'thermomix.jpg',
            tags: ['cooking', 'tech']
        },
        {   name: 'AirPods',
            onSale: false,
            price: 60,
            photo: 'airpods.jpg',
            tags: ['tech', 'hobbies']
        },
        {   name: 'Nikon Camera',
            onSale: false,
            price: 60,
            photo: 'nikon.jpg',
            tags: ['hobbies']
        },
        {   name: 'Nintendo Switch',
            onSale: true,
            price: 200,
            photo: 'nintendo.jpg',
            tags: ['hobbies', 'tech']
        },

    ]);
    console.log(`${inserted.length} ads added to de DataBase.`)
}

// Minimizamos el riesgo de borrar la BBDD por error
function questionYN(texto) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(texto, answer => {
            interface.close();
            if (answer.toLowerCase() === 'yes') {
                resolve(true);
                return;
        }
        resolve(false);
        })
    })
}