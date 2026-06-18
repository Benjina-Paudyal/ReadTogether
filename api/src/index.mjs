import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./configs/knex-config.js";
import userRouter from "./routers/user.js";
import nestedRouter from "./routers/nested.js";

// for swagger
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = express.Router();
const PORT = process.env.PORT ?? 3000;

// Example route to check DB
apiRouter.get("/", async (req, res) => {
  try {
    const data = await knex("practise_table"); // table must exist in DB
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Nested routes
apiRouter.use("/nested", nestedRouter);
app.use("/api/users", userRouter);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
