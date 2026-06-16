import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routers/authRoutes.js";

// for swagger
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// auth service (remember MVC)
app.use("/api/auth", authRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
