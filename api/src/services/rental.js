import {
  findRentalWithOwnerAndBook,
  updateRentalStatus,
} from "../models/rental.js";
import { RENTAL_STATUS } from "../constants/rentalStatuses.js";

export const handoverBook = async (rentalId, loggedInUserId) => {
  const rental = await findRentalWithOwnerAndBook(rentalId);

  if (!rental) {
    const error = new Error("Rental record not found.");
    error.status = 404;
    throw error;
  }

  // Fraud Prevention: Only the book owner can trigger a handover
  if (rental.owner_id !== loggedInUserId) {
    const error = new Error(
      "Unauthorized. Only the book owner can confirm handovers."
    );
    error.status = 403;
    throw error;
  }

  // Status Validation: Ensure the rental has been approved before handover
  if (rental.status !== RENTAL_STATUS.APPROVED) {
    const error = new Error(
      `Cannot handover a book with a rental status of '${rental.status}'.`
    );
    error.status = 400;
    throw error;
  }

  await updateRentalStatus(rentalId, RENTAL_STATUS.RENTED);

  return {
    message: "Book handover successfully confirmed. Rental is now active.",
  };
};
