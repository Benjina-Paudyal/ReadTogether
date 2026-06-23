import express from "express";
import { login , me} from "../controllers/authController.js";
import {authMiddleware, requireNormalUser, requireAdmin} from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validators/login.js";

const router = express.Router();



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authMiddleware, me);


 /**
  * @swagger
  * /auth/test-normal:
  *   get:
  *     summary: Test route for normal users
  *     description: Accessible only by authenticated users with role normal_user
  *     tags: [Auth]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: Success response for normal user
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: Hello normal user
  *                 user:
  *                   type: object
  *       401:
  *         description: Unauthorized (missing or invalid token)
  *       403:
  *         description: Forbidden (not a normal user)
  */
router.get(
  "/test-normal",
  authMiddleware,
  requireNormalUser,
  (req, res) => {
    res.json({
      message: "Hello normal user",
      user: req.user,
    });
  }
);

 /**
  * @swagger
  * /auth/test-admin:
  *   get:
  *     summary: Test route for admin users
  *     description: Accessible only by authenticated users with role Admin
  *     tags: [Auth]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: Success response for admin
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: Hello admin
  *                 user:
  *                   type: object
  *       401:
  *         description: Unauthorized (missing or invalid token)
  *       403:
  *         description: Forbidden (not an admin)
  */
router.get(
  "/test-admin",
  authMiddleware,
  requireAdmin,
  (req, res) => {
    res.json({
      message: "Hello admin",
      user: req.user,
    });
  }
);


export default router;