const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/books', require('./routes/books'));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '0.1.0',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            contact: {
                name: 'Aswangga Bhanu Rizqullah',
                url: 'https://github.com/bhanurzh',
                email: 'aswanggab@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});