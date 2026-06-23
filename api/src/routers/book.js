import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAvailability,
} from "../controllers/book.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books API
 */

/**
 * @swagger
 * /api/books:
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
// GET /api/books
router.get("/", getBooks);

/**
 * @swagger
 * /api/books/{id}:
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
// GET /api/books/:id
router.get("/:id", getBookById);


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 cover_url:
 *                   type: string
 *                 condition:
 *                   type: string
 *                 category_id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
// POST /api/books
router.post("/", createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
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
 *         description: Book updated
 */
// PUT /api/books/:id 
router.put("/:id", updateBook);


/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted
 */
// DELETE /api/books/:id
router.delete("/:id", deleteBook);

/**
 * @swagger
 * /api/books/{id}/availability:
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
 */
// GET /api/books/:id/availability
router.get("/:id/availability", getAvailability)

export default router;
