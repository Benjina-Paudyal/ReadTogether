import express from "express";
import {
  getAll,
  getOne,
  create,
  deleteCategory,
//   getBooksByCategory,
} from "../controllers/categoryController.js";

// import {
//   authMiddleware,
//   requireAdmin,
// } from "../middleware/authMiddleware.js";

const router = express.Router();

// const adminOnly = [authMiddleware, requireAdmin];

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Category created successfully
 *               data:
 *                 id: 11
 *                 name: Technology
 *                 description: Tech, programming, and innovation
 */
router.post("/", create);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category (Admin only)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.delete("/:id", deleteCategory);

// Benjina Paudyal (Dependency) so wait

// /**
//  * @swagger
//  * /categories/{id}/books:
//  *   get:
//  *     summary: Get all books under a category
//  *     tags: [Categories]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: List of books
//  *       404:
//  *         description: Category not found
//  */
// router.get("/:id/books", getBooksByCategory);

export default router;