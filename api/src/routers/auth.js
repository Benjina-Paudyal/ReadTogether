import express from "express";
import { signup } from "../controllers/auth.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

export default router;
