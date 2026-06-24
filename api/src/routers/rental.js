import express from "express";
import { requestRental, approveRental } from "../controllers/rental.js";

const router = express.Router();

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Create a new rental request
 *     description: Creates a rental request with status "requested"
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book_id
 *               - borrower_id
 *             properties:
 *               book_id:
 *                 type: integer
 *                 example: 1
 *               borrower_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Rental request created successfully
 *       500:
 *         description: Server error
 */
router.post("/", requestRental);

/**
 * @swagger
 * /rentals/{id}/approve:
 *   patch:
 *     summary: Approve a rental request
 *     description: Changes rental status from "requested" to "approved"
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rental approved successfully
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/approve", approveRental);

export default router;