const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API by Mignrod'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc);
