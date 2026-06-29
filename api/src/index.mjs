import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routers/auth.js";
import connection from "./configs/knex-config.js";
import userRouter from "./routers/user.js";
import bookRoutes from "./routers/book.js";
import categoryRoutes from "./routers/category.js";
import rentalRouter from "./routers/rentals.js";
import swaggerSpec from "./configs/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = express.Router();
const PORT = process.env.PORT ?? 3000;

apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/rentals", rentalRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
