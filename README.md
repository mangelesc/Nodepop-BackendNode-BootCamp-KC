# NODEPOP - PRÁCTICA BACKEND CON NODE
## Autora: Mª Ángeles Córdoba
## Bootcamp *Mujeres en Tech* by KeepCoding

API desarrollada con Express y MongoBD, con ayuda de [postman](www.postman.com) para realizar las peticiones. 
La APi está pensaba para ejecutarse en el servidor de un servicio de venta de segunda mano llamado Nodepop, con anuncios que artículos que puedes estar en venta o búsqueda.

Tenemos una BBDD con anuncios (**ads**), y cada anuncio tendrá los siguientes datos: 
  - **name**: String
  - **onSale**: Boolean
  - **price**: Number
  - **photo**: String
  - **tags**: [{type: String, enum: ['cooking', 'sports', 'hobbies', 'tech'],}]
  - **created**: Date (añadida automáticamente)


## Puesta en marcha

Desplegar la app:
```sh
npm install
```

Añadir/reestablecer datos en nuestra BBDD
  '*yes*' para confirmar
  '*no*'/*cualquier input* para denegar 
```sh
npm run init-db
```

Arrancar la app en modo producción
```sh
npm start
```

Arrancar la app en modo desarrollo
```sh
npm run dev
```

Aplicación configurada para arrancar en el **puerto 3000**


##  Documentación de la API

Obtendremos los **resultados** con la siguiente estructura JSON: 
```sh
    {
      "results": [
          {
              "_id": "63b9ab30d321900485db1d71",
              "name": "Nintendo Switch",
              "onSale": true,
              "price": 200,
              "photo": "/public/images/nintendo.jpg",
              "tags": [
                  "hobbies",
                  "tech"
              ],
              "created": "2023-01-07T17:26:08.643Z",
              "__v": 0
          },
      ]
    }
```

Esta API nos permite hacer **CRUD** con los ads de la BBDD, a continuación se muestran algunos ejemplos de uso: 

### Create
Añadimos los datos a insertar en el body de la petición POST
    ```sh
    POST http://localhost:3000/api/ads
    ```

### Read
Obtener un listado de todos los ads disponibles en la BBDD
    ```sh
    GET http://localhost:3000/api/ads
    ```

Obtener un add por id
    ```sh
    GET http://localhost:3000/api/ads/63b9ab30d321900485db1d6d
    ```

Ejemplos con búsquedas filtradas: 
  - **name**
    Posibilidad de buscar por el nombre completo o que empiece por el dato introducido
    ```sh
    GET http://localhost:3000/api/ads?name=scooter
    ```
    ```sh
    GET http://localhost:3000/api/ads?name=n
    ```
  - **onSale**
    'true' para ventas, 'false' para búsqueda
    ```sh
    GET http://localhost:3000/api/ads?onSale=true
    ```
  - **price**
    ```sh
    GET http://localhost:3000/api/ads?price=60
    ```
  - Por rango de precio con **minPrice**, **maxPrice**
    ```sh
    GET http://localhost:3000/api/ads?minPrice=50&maxPrice=100
    ```
  - **tags**
    ```sh
    GET http://localhost:3000/api/ads?tags=tech&tags=hobbies
    ```

Ordenación con **sort**
  -Ordenar por fecha de creación
  ```sh
  GET http://localhost:3000/api/ads?sort=created
  ```

Paginación con **skip** y **limit**
  ```sh
  GET http://localhost:3000/api/ads?skip=0&limit=2
  ```

### Update
Añadimos los campos a actualizar en el body de la petición PUT
  ```sh
  PUT http://localhost:3000/api/ads/63b9ab30d321900485db1d6d
  ```

### Delete
  ```sh
  DELETE http://localhost:3000/api/ads/63b9ab30d321900485db1d6e 
  ```
