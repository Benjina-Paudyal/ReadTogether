import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

const PORT = process.env.PORT ?? 3000;

// Example route to check DB
apiRouter.get("/", async (req, res) => {
  try {
    const data = await knex("practise_table");
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
