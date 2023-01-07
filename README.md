# Nodepop

Deploy:

```sh
npm install
```

Load initial data to database:

```sh
npm run init-db
```

Start the application in production with:

```sh
npm start
```

Start the application in development with:

```sh
npm run dev
```

## API Documentation
Agent list:

GET /api/agentes
{
  "results": [
    {
      "_id": "63a0ce45a218b0f0d04be561",
      "name": "Smith",
      "age": 35
    },
  ]
}