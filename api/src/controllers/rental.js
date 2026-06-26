import { handoverBook, requestBook } from "../services/rental.js";

export const createRentalController = async (req, res) => {
  try {
    const { book_id } = req.body;
    const borrowerId = req.user.id;

    if (!book_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required field: book_id",
      });
    }

    const result = await requestBookRental(book_id, borrowerId);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Create Rental Controller Error:", error);
    return res.status(error.status || 500).json({
      error: error.status === 400 ? "Bad Request" : "Internal Server Error",
      message:
        error.message ||
        "An error occurred while submitting your rental request.",
    });
  }
};

export const handoverBookController = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const loggedInUserId = req.user.id;

    const result = await handoverBook(rentalId, loggedInUserId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Handover Controller Error:", error);
    return res.status(error.status || 500).json({
      error:
        error.status === 403
          ? "Forbidden"
          : error.status === 404
            ? "Not Found"
            : "Internal Server Error",
      message:
        error.message || "An error occurred during the book handover process.",
    });
  }
};
