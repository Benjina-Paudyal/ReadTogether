import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";

// for swagger
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

app.use("/api", apiRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ReadTogether backend server is running and healthy!",
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
