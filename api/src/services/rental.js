import {
  findActiveRentalByBookId,
  createRentalRequest,
  findRentalWithOwnerAndBook,
  updateRentalStatus,
  findRentalById,
  updateRentalById,
} from "../models/rental.js";
import { RENTAL_STATUS } from "../constants/rentalStatuses.js";

// Processes a new book rental request after validating availability
export const requestBook = async (bookId, borrowerId) => {
  const activeRental = await findActiveRentalByBookId(bookId);

  if (activeRental) {
    const error = new Error(
      "The requested book is currently unavailable for rent."
    );
    error.status = 400;
    throw error;
  }

  const newRental = await createRentalRequest({
    book_id: bookId,
    borrower_id: borrowerId,
    status: RENTAL_STATUS.REQUESTED,
  });

  return {
    message:
      "Rental request submitted successfully. Waiting for owner approval.",
    data: newRental,
  };
};

// Validates ownership and current state before accepting a rental request.
export const acceptRentalRequest = async (rentalId, loggedInUserId) => {
  const rental = await findRentalWithOwnerAndBook(rentalId);

  if (!rental) {
    const error = new Error("Rental record not found.");
    error.status = 404;
    throw error;
  }

  if (rental.owner_id !== loggedInUserId) {
    const error = new Error(
      "Unauthorized. Only the book owner can accept rental requests."
    );
    error.status = 403;
    throw error;
  }

  if (rental.status !== RENTAL_STATUS.REQUESTED) {
    const error = new Error(
      `Cannot accept a rental request that is currently '${rental.status}'.`
    );
    error.status = 400;
    throw error;
  }

  const updatedRental = await updateRentalStatus(
    rentalId,
    RENTAL_STATUS.APPROVED
  );

  return {
    message: "Rental request accepted successfully.",
    data: updatedRental,
  };
};

// Process a book handover
export const handoverBook = async (rentalId, loggedInUserId) => {
  const rental = await findRentalWithOwnerAndBook(rentalId);

  if (!rental) {
    const error = new Error("Rental record not found.");
    error.status = 404;
    throw error;
  }

  if (rental.borrower_id !== loggedInUserId) {
    const error = new Error(
      "Unauthorized. Only the borrower who requested this book can confirm handover."
    );
    error.status = 403;
    throw error;
  }

  if (rental.status !== RENTAL_STATUS.APPROVED) {
    const error = new Error(
      `Cannot handover a book with a rental status of '${rental.status}'.`
    );
    error.status = 400;
    throw error;
  }

  const updatedRental = await updateRentalStatus(
    rentalId,
    RENTAL_STATUS.RENTED
  );

  return {
    message: "Book handover successfully confirmed. Rental is now active.",
    data: updatedRental,
  };
};

// Process a book return
export const returnRentalService = async (rentalId, userId) => {
  const rental = await findRentalById(rentalId);

  if (!rental) throw new Error("RENTAL_NOT_FOUND");

  if (rental.borrower_id !== userId) {
    throw new Error("NOT_BORROWER");
  }

  // Uniform status check alignment
  if (rental.status !== RENTAL_STATUS.RENTED && rental.status !== "rented") {
    throw new Error("INVALID_STATUS");
  }

  const updated = await updateRentalById(rentalId, {
    status: "returned", // Match database storage pattern
    returned_at: new Date(),
  });

  return updated[0];
};
