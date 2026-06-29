import express from "express";
import * as RentalController from "../controllers/rental.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     tags:
 *       - Rentals
 *     summary: Create a rental request for a book
 *     description: Automatically identifies the borrower via the login token, verifies book availability, and instantiates a new rental entry with a 'REQUESTED' status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book_id
 *             properties:
 *               book_id:
 *                 type: integer
 *                 description: The unique identifier of the book to request
 *     responses:
 *       201:
 *         description: Rental request submitted successfully. Waiting for owner approval.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     UniqueID:
 *                       type: integer
 *                     book_id:
 *                       type: integer
 *                     borrower_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     request_date:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad Request - Missing required fields or book is currently unavailable.
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, RentalController.createRental);

/**
 * @swagger
 * /api/rentals/{id}/accept:
 *   patch:
 *     tags:
 *       - Rentals
 *     summary: Accept a rental request
 *     description: Allows the book owner to accept an incoming rental request. Verifies ownership via token identity, checks that the current state is 'REQUESTED', and transitions the state to 'APPROVED'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the rental record
 *     responses:
 *       200:
 *         description: Rental request accepted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request - Rental is not in a 'REQUESTED' state.
 *       403:
 *         description: Forbidden - Only the book owner is authorized to accept requests.
 *       404:
 *         description: Not Found - Rental record not found.
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id/accept", authMiddleware, RentalController.acceptRental);

/**
 * @swagger
 * /api/rentals/{id}/handover:
 *   patch:
 *     tags:
 *       - Rentals
 *     summary: Confirm the handover of a book
 *     description: Allows the assigned borrower to confirm receipt of the book. Verifies borrower identity via token, checks that the current state is 'APPROVED', and transitions the state to 'RENTED'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The UniqueID of the rental record
 *     responses:
 *       200:
 *         description: Book handover successfully confirmed. Rental is now active.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request - Rental is not in an 'APPROVED' state.
 *       403:
 *         description: Forbidden - Only the assigned borrower is authorized to confirm handovers.
 *       404:
 *         description: Not Found - Rental record not found.
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id/handover", authMiddleware, RentalController.handoverBook);

/**
 * @swagger
 * /api/rentals/{id}/return:
 *   patch:
 *     tags:
 *       - Rentals
 *     summary: Borrower returns the book
 *     description: Allows the borrower to mark the book as returned.
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
router.patch("/:id/return", authMiddleware, RentalController.returnRental);

export default router;
