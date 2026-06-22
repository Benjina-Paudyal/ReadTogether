import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
} from "../controllers/user.js";

const router = express.Router();

// Routes
router.get("/", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);

export default router;
