import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js";
import categoryRouter from "./routers/category.js";
import connection from "./configs/knex-config.js";

import userRouter from "./routers/user.js";
import bookRoutes from "./routers/book.js";
import rentalRouter from "./routers/rentals.js";

// for swagger
// import swaggerSpec from "./swagger.js";
import swaggerSpec from "./configs/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// auth service (remember MVC)
app.use("/api/auth", authRouter);

const apiRouter = express.Router();
const PORT = process.env.PORT ?? 3000;

app.use("/api", apiRouter);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
