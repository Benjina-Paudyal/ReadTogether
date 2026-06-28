import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  getCurrentUserBooksController,
  getCurrentUserBorrowedController,
} from "../controllers/user.js";

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

// TODO: Add authenticating token middleware once feature/auth is merged
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user details by ID
 *     description: Retrieves profile details for a specific user using their unique ID.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 location:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error
 */

// TODO: Add authenticating token middleware once feature/auth is merged
router.get("/:id", getUserById);

/**
 * @swagger
 * /users/me/books:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get books owned by the current user
 *     description: Retrieves a list of all books associated with the currently authenticated user session.
 *     responses:
 *       200:
 *         description: A list of books in the user's library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */

// MOCK AUTHENTICATION MIDDLEWARE PLACEHOLDER
// TODO: Replace this with real JWT verification middleware once implemented
const mockAuth = (req, res, next) => {
  req.user = {
    id: 1,
  };
  next();
};

router.get("/me/books", mockAuth, getCurrentUserBooksController);

/**
 * @swagger
 * /users/me/borrowed:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get books currently borrowed by the user
 *     description: Retrieves list of all active rentals that are currently checked out by the logged-in user.
 *     responses:
 *       200:
 *         description: A list of actively borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rental_id:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   due_date:
 *                     type: string
 *                     format: date
 *                   book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *       500:
 *         description: Internal Server Error
 */

router.get("/me/borrowed", mockAuth, getCurrentUserBorrowedController);

// TODO: Future Extension - Add GET /api/users/:id/books and GET /api/users/:id/borrowed to allow admin to view other profiles' libraries.

export default router;
