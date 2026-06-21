import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// GET /api/books
router.get("/", getBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// POST /api/books
router.post("/", createBook);

// PUT /api/books/:id  (UPDATE)
router.put("/:id", updateBook);

// DELETE /api/books/:id
router.delete("/:id", deleteBook);

export default router;
