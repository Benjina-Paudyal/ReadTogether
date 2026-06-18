import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import userRouter from "./routers/user.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
app.use("/api/users", userRouter);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
