import express from "express";
import { getCurrentUserBooksController } from "../controllers/user.js";

const router = express.Router();

//temporary middleware
const mockAuthenticateToken = (req, res, next) => {
  req.user = { id: 1 };
  next();
};

router.get("/me/books", mockAuthenticateToken, getCurrentUserBooksController);

export default router;
