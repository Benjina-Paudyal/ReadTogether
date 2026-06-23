import express from "express";
import { registerUser } from "../controllers/user.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
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
 *      responses:
 *        201:
 *          description: Account created successfully.
 *        400:
 *          description: Bad Request - Missing parameters.
 *        409:
 *          description: Conflict - Email already registered.
 *        500:
 *          description: Internal Server Error.
 */
router.post("/register", registerUser);

export default router;
