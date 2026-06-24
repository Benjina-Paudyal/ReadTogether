import db from "../configs/knex-config.js";

// AVAILABILITY CHECK 
export function findActiveRentalByBookId(bookId) {
  return db("Rentals")
    .where("book_id", bookId)
    .whereIn("status", ["requested", "approved", "active"])
    .first();
}