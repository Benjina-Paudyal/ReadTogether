import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  getCurrentUserBooksController,
  getCurrentUserBorrowedController,
} from "../controllers/user.js";

import {authMiddleware} from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user account
 *     description: Creates a new user profile with a hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully.
 *       400:
 *         description: Bad Request - Missing parameters.
 *       409:
 *         description: Conflict - Email already registered.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of all users
 *     description: Fetches all user profiles from the database, omitting sensitive password data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   location:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */


router.get("/", authMiddleware, requireRole("admin"), getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user details by ID
 *     description: Retrieves profile details for a specific user using their unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the user
 *     responses:
 *       200:
 *         description: User profile found successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error
 */


router.get("/:id", authMiddleware, requireRole("admin"), getUserById);

/**
 * @swagger
 * /users/me/books:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get books owned by the current user
 *     description: Retrieves a list of all books associated with the currently authenticated user session.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books in the user's library.
 *       500:
 *         description: Internal Server Error
 */
router.get("/me/books", authMiddleware, getCurrentUserBooksController);

/**
 * @swagger
 * /users/me/borrowed:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get books currently borrowed by the user
 *     description: Retrieves list of all active rentals that are currently checked out by the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of actively borrowed books.
 *       500:
 *         description: Internal Server Error
 */

router.get("/me/borrowed", authMiddleware, getCurrentUserBorrowedController);


export default router;
