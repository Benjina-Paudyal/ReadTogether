import {
  createRental,
  getRentalById,
  approveRentalRequest,
} from "../models/rental.js";

// Create rental request
export async function requestRental(req, res) {
  try {
    const { book_id, borrower_id } = req.body;

    const rental = await createRental({
      book_id,
      borrower_id,
    });

    return res.status(201).json(rental);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create rental request",
    });
  }
}

// Approve rental request
export async function approveRental(req, res) {
  try {
    const { id } = req.params;

    const rental = await getRentalById(id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental request not found",
      });
    }

    if (rental.status !== "requested") {
      return res.status(400).json({
        message: `Rental request has already been processed (current status: ${rental.status})`,
      });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const updatedRental = await approveRentalRequest(id, dueDate);

    return res.status(200).json(updatedRental);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to approve rental request",
    });
  }
}