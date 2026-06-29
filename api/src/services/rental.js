import {
  findActiveRentalByBookId,
  createRentalRequest,
  findRentalWithOwnerAndBook,
  updateRentalStatus,
} from "../models/rental.js";
import { RENTAL_STATUS } from "../constants/rentalStatuses.js";

//Processes a new book rental request after validating availability
export const requestBook = async (bookId, borrowerId) => {
  const activeRental = await findActiveRentalByBookId(bookId);

  if (activeRental) {
    const error = new Error(
      "The requested book is currently unavailable for rent."
    );
    error.status = 400;
    throw error;
  }

  //Create the Rental Request: Insert with unified uppercase constant
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

//Validates ownership and current state before accepting a rental request.
export const acceptRentalRequest = async (rentalId, loggedInUserId) => {
  const rental = await findRentalWithOwnerAndBook(rentalId);

  if (!rental) {
    const error = new Error("Rental record not found.");
    error.status = 404;
    throw error;
  }

  //Fraud Prevention: Only the book owner can accept rental requests
  if (rental.owner_id !== loggedInUserId) {
    const error = new Error(
      "Unauthorized. Only the book owner can accept rental requests."
    );
    error.status = 403;
    throw error;
  }

  //Status Validation
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

//Process a book handover
export const handoverBook = async (rentalId, loggedInUserId) => {
  const rental = await findRentalWithOwnerAndBook(rentalId);

  if (!rental) {
    const error = new Error("Rental record not found.");
    error.status = 404;
    throw error;
  }

  // Identity Check: Only the borrower can confirm they received it
  if (rental.borrower_id !== loggedInUserId) {
    const error = new Error(
      "Unauthorized. Only the borrower who requested this book can confirm handover."
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

  const updatedRental = await updateRentalStatus(
    rentalId,
    RENTAL_STATUS.RENTED
  );

  return {
    message: "Book handover successfully confirmed. Rental is now active.",
    data: updatedRental,
  };
};
