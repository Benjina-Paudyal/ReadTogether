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
