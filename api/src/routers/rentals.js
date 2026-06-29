import express from "express";
import { returnRental } from "../controllers/rental.js";

const router = express.Router();

/**
 * @swagger
 * /rentals/{id}/return:
 *   patch:
 *     summary: Borrower returns the book
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rental marked as returned
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Not borrower
 *       404:
 *         description: Rental not found
 */
router.patch("/:id/return", returnRental);

export default router;