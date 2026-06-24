import { handoverBook } from "../services/rental.js";

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
