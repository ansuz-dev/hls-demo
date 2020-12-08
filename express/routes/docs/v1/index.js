import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Template API Documentation",
      version: "1.0.0",
      description: "The tempalte API",
    },
    servers: [
      {
        url: "/api/v1/",
        description: "Development",
      },
    ],
  },
  apis: [
    "./express/routes/api/v1/**/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(swaggerSpec));

export default router;
