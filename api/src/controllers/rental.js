import { createRentalSchema } from "../validators/rentals.js";

export const createRental = async (req, res) => {
  try {
    const validatedBody = createRentalSchema.parse(req.body);
    const { book_id } = validatedBody;

    const borrowerId = req.user.id;

    const result = await RentalService.requestBook(book_id, borrowerId);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Create Rental Controller Error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Bad Request",
        message: error.errors[0].message,
      });
    }

    return res.status(error.status || 500).json({
      error: error.status === 400 ? "Bad Request" : "Internal Server Error",
      message:
        error.message ||
        "An error occurred while submitting your rental request.",
    });
  }
};

export const acceptRental = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const loggedInUserId = req.user.id;

    const result = await RentalService.acceptRentalRequest(
      rentalId,
      loggedInUserId
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Accept Rental Controller Error:", error);
    return res.status(error.status || 500).json({
      error:
        error.status === 403
          ? "Forbidden"
          : error.status === 404
            ? "Not Found"
            : error.status === 400
              ? "Bad Request"
              : "Internal Server Error",
      message:
        error.message ||
        "An error occurred while accepting the rental request.",
    });
  }
};

export const handoverBook = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const loggedInUserId = req.user.id;

    const result = await RentalService.handoverBook(rentalId, loggedInUserId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Handover Controller Error:", error);
    return res.status(error.status || 500).json({
      error:
        error.status === 400
          ? "Bad Request"
          : error.status === 403
            ? "Forbidden"
            : error.status === 404
              ? "Not Found"
              : "Internal Server Error",
      message:
        error.message || "An error occurred during the book handover process.",
    });
  }
};
import { returnRentalService } from "../services/rental.js";

export async function returnRental(req, res) {
  try {
    const result = await returnRentalService(req.params.id, req.user.id);

    return res.json(result);
  } catch (err) {
    if (err.message === "RENTAL_NOT_FOUND") {
      return res.status(404).json({ message: "Rental not found" });
    }

    if (err.message === "NOT_BORROWER") {
      return res.status(403).json({ message: "Not the borrower" });
    }

    if (err.message === "INVALID_STATUS") {
      return res.status(400).json({
        message: "Rental must be in rented state",
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
}
