import connection from "../configs/knex-config.js";

export const getCurrentUserBooksService = async (userId) => {
  // Query the database for books matching this specific user
  const userBooks = await connection("Books")
    .where({ user_id: userId })
    .select("*");

  return userBooks;
};
