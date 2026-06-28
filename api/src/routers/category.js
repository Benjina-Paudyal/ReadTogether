import express from "express";
import { createCategory,  getCategories, getCategoryById, } from "../controllers/category.js";
// import authMiddleware from "../middlewares/auth.js";
// import { requireRole } from "../middlewares/role.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fiction"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden (Admin only)
 */

// ONCE MIDDLEWARE IS IMPLEMENTED
// router.post(
//   "/",
//   authMiddleware,
//   requireRole("admin"),
//   createCategory
// );

router.post("/", createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getCategories);

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
router.get("/:id", getCategoryById);


export default router;
