import connection from "../configs/knex-config.js";
import { RENTAL_STATUS } from "../constants/rentalStatuses.js";

// AVAILABILITY CHECK
export function findActiveRentalByBookId(bookId) {
  return connection("Rentals")
    .where("book_id", bookId)
    .whereIn("status", [
      RENTAL_STATUS.REQUESTED,
      RENTAL_STATUS.APPROVED,
      RENTAL_STATUS.RENTED,
    ])
    .first();
}

// Fetch active rentals along with their book details using a single SQL join
export const findActiveRentalsWithBooksByBorrowerId = async (userId) => {
  return await connection("Rentals")
    .join("Books", "Rentals.book_id", "=", "Books.id")
    .where("Rentals.borrower_id", userId)
    .andWhere("Rentals.status", RENTAL_STATUS.RENTED)
    .select(
      "Rentals.id as rental_id",
      "Rentals.status",
      "Rentals.due_date",
      "Books.id as book_id",
      "Books.title",
      "Books.description"
    );
};
