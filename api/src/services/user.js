import connection from "../configs/knex-config.js";

export const getCurrentUserBorrowedService = async (userId) => {
  const borrowedBooks = await connection("Rentals")
    .join("Books", "Rentals.book_id", "=", "Books.id")
    .where("Rentals.borrower_id", userId)
    .andWhere("Rentals.status", "rented")
    .select(
      "Books.id as book_id",
      "Books.title",
      "Books.author",
      "Rentals.UniqueID as rental_id",
      "Rentals.status",
      "Rentals.due_date"
    );

  return borrowedBooks;
};
