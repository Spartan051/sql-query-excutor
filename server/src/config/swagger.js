module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Formsaz API",
      version: "1.0.0",
      contact: {
        email: "hardtry.developer@getMaxListeners.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io",
    },
  },
  apis: ["./src/services/swagger.service.js"],
};
