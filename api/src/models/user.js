import connection from "../configs/knex-config.js";

// Get all users
export const findAllUsers = async () => {
  return await connection("Users").select(
    "id",
    "name",
    "email",
    "location",
    "created_at"
  );
};

// Find a specific user by ID
export const findUserById = async (id) => {
  return await connection("Users")
    .where({ id })
    .select("id", "name", "email", "location", "created_at")
    .first();
};

// Get user by email (Kept for internal use by Auth/Registration workflows)
export const findUserByEmail = async (email) => {
  return await connection("Users")
    .where({ email })
    .select("id", "name", "email", "location", "created_at")
    .first();
};

//Fetch all books belonging to a specific user from the Books table
export const findBooksByUserId = async (userId) => {
  return await connection("Books").where({ user_id: userId }).select("*");
};

//Fetch all books borrowed by a specific user from the Books table
export const findBorrowedBooksByUserId = async (userId) => {
  return await connection("Rentals")
    .join("Books", "Rentals.book_id", "=", "Books.id")
    .where("Rentals.borrower_id", userId)
    .andWhere("Rentals.status", "rented")
    .select(
      "Books.id as book_id",
      "Books.title",
      "Books.description",
      "Rentals.id as rental_id",
      "Rentals.status",
      "Rentals.due_date"
    );
};
