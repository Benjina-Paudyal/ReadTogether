import connection from "../configs/knex-config.js";

// AVAILABILITY CHECK
export function findActiveRentalByBookId(bookId) {
  return connection("Rentals")
    .where("book_id", bookId)
    .whereIn("status", ["requested", "approved", "active"])
    .first();
}

// Finds a rental and joins the book to find the book's owner
export const findRentalWithOwnerAndBook = async (rentalId) => {
  return await connection("Rentals")
    .join("Books", "Rentals.book_id", "=", "Books.id")
    .where("Rentals.id", rentalId)
    .select(
      "Rentals.id as rental_id",
      "Rentals.status",
      "Rentals.borrower_id",
      "Books.user_id as owner_id"
    )
    .first();
};

// Updates the rental status cleanly
export const updateRentalStatus = async (rentalId, status) => {
  return await connection("Rentals")
    .where({ id: rentalId })
    .update({
      status: status,
      updated_at: connection.fn.now(),
    })
    .returning(["id", "book_id", "status", "updated_at"]);
};

//Creates a new rental request record in the database.
export const createRentalRequest = async (rentalData) => {
  return (
    await connection("Rentals")
      .insert({
        book_id: rentalData.book_id,
        borrower_id: rentalData.borrower_id,
        status: rentalData.status,
        request_date: connection.fn.now(),
        created_at: connection.fn.now(),
        updated_at: connection.fn.now(),
      })
      .returning(["id", "book_id", "borrower_id", "status", "request_date"])
  )[0];
};
