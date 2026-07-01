import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAvailability,
} from "../controllers/book.js";
import {authMiddleware} from "../middlewares/auth.js";
import { canModifyBook } from "../utilities/permissions/bookPermissions.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
// GET /books
router.get("/", getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Book not found
 */
// GET /books/:id
router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new book entry in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Harry Potter"
 *               description:
 *                 type: string
 *                 example: "A young wizard story"
 *               cover_url:
 *                 type: string
 *                 example: "https://example.com/cover.jpg"
 *               condition:
 *                 type: string
 *                 example: "good"
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Book created successfully
 */
// POST /books
router.post("/", authMiddleware, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Book not found
 */
router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    const result = await canModifyBook(req.user, req.params.id);

    if (!result.allowed) {
      if (result.reason === "NOT_FOUND") {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(403).json({ message: "Forbidden" });
    }

    req.book = result.book;
    next();
  },
  updateBook,
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Book not found
 */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    const result = await canModifyBook(req.user, req.params.id);

    if (!result.allowed) {
      if (result.reason === "NOT_FOUND") {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(403).json({ message: "Forbidden" });
    }

    req.book = result.book; // optional
    next();
  },
  deleteBook
);

/**
 * @swagger
 * /books/{id}/availability:
 *   get:
 *     summary: Check book availability
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Availability status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookId:
 *                   type: integer
 *                 available:
 *                   type: boolean
 *                 status:
 *                   type: string
 *       404:
 *         description: Book not found
 */
router.get("/:id/availability", getAvailability);


export default router;
