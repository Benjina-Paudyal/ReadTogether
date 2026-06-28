import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routers/user.js";
import bookRoutes from "./routers/book.js";
import categoryRoutes from "./routers/category.js"
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

apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
