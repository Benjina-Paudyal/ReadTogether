import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./configs/knex-config.js";
import bookRoutes from "./routers/book.js";

// for swagger
// import swaggerSpec from "./swagger.js";
import swaggerSpec from "./configs/swagger.js";
import swaggerUi from "swagger-ui-express";

import userRouter from "./routers/user.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = express.Router();
const PORT = process.env.PORT ?? 3000;

// Example route to check DB
/* apiRouter.get("/", async (req, res) => {
  try {
    const data = await connection("practise_table"); // table must exist in DB
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}); */

apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
