import express from "express";
import {
  createRentalController,
  handoverBookController,
} from "../controllers/rental.js";

const router = express.Router();

// MOCK AUTHENTICATION MIDDLEWARE PLACEHOLDER
// TODO: Replace this with real JWT verification middleware once feature/auth is merged
const mockAuth = (req, res, next) => {
  req.user = {
    id: 1, // Simulated Borrower ID
  };
  next();
};

/**
 * @swagger
 * /api/rentals:
 *   post:
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

// TODO: Replace mockAuth with real token validation middleware once feature/auth is merged
router.post("/", mockAuth, createRentalController);

/**
 * @swagger
 * /api/rentals/{id}/handover:
 *   patch:
 *     summary: Confirm the handover of a book
 *     description: Allows the book owner to confirm that the borrower has received the book. Verifies ownership via token identity, checks that the current state is 'APPROVED', and transitions the state to 'RENTED'.
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
 *         description: Forbidden - Only the book owner is authorized to confirm handovers.
 *       404:
 *         description: Not Found - Rental record not found.
 *       500:
 *         description: Internal Server Error
 */

// TODO: Replace mockAuth with real token validation middleware once feature/auth is merged
router.patch("/:id/handover", mockAuth, handoverBookController);

export default router;
