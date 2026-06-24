import express from "express";
import { registerUser, getAllUsers, getUserById } from "../controllers/user.js";

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *    post:
 *      summary: Register a new user account
 *      description: Creates a new user profile with a hashed password.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            required: [name, email, password, location]
 *            properties:
 *              name: { type: string }
 *              email: { type: string }
 *              password: { type: string }
 *              location: { type: string }
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
 *    get:
 *      summary: Retrieve a list of all users
 *      description: Fetches all user profiles from the database, omitting sensitive password data.
 *    responses:
 *      200:
 *        description: A list of user profiles.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  location:
 *                    type: string
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *       500:
 *         description: Internal Server Error
 */

// TODO: Add authenticating token middleware once feature/auth is merged
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *      summary: Get user details by ID
 *      description: Retrieves profile details for a specific user using their unique ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The unique identifier of the user
 *   responses:
 *      200:
 *        description: User profile found successfully.
 *        content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               created_at:
 *                 type: string
 *               format: date-time
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error
 */

// TODO: Add authenticating token middleware once feature/auth is merged
router.get("/:id", getUserById);

export default router;
