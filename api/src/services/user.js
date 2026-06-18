import connection from "../configs/knex-config.js";

export const getCurrentUserBooksService = async (userId) => {
  // Query the database for books matching this specific user
  // Double-check your exact ERD table name case ('Books' vs 'books')!
  const userBooks = await connection("Books")
    .where({ user_id: userId })
    .select("*"); // or specify clean column names like ['id', 'title', 'author']

  return userBooks;
};
