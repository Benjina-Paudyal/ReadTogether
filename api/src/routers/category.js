import express from "express";
import { createCategory } from "../controllers/category.js";
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

export default router;
