import { findRentalById, updateRentalById } from "../models/rental.js";

export async function returnRentalService(rentalId, userId) {
  const rental = await findRentalById(rentalId);

  if (!rental) throw new Error("RENTAL_NOT_FOUND");

  if (rental.borrower_id !== userId) {
    throw new Error("NOT_BORROWER");
  }

  if (rental.status !== "rented") {
    throw new Error("INVALID_STATUS");
  }

  const updated = await updateRentalById(rentalId, {
    status: "returned",
    returned_at: new Date(),
  });

  return updated[0];
}
