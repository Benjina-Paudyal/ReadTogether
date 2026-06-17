import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./configs/knex-config.js";
import authRouter from "./routers/authRoutes.js";
import userRouter from "./routers/user.js";
import bookRouter from "./routers/bookRoutes.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// auth routes
app.use("/api/auth", authRouter);

// user routes
app.use("/api", userRouter);

// book routes
app.use("/api/books", bookRouter);

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ReadTogether backend server is running and healthy!",
    timestamp: new Date(),
  });
});

// DB test route
app.get("/api/db-test", async (req, res) => {
  try {
    const data = await knex("practise_table");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});