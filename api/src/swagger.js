import swaggerJSDoc from "swagger-jsdoc";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
      description: "Simple MVC Books API",
    },

    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "User", description: "User APIs" },
    ],

    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [],
  },

  apis: ["./src/routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;