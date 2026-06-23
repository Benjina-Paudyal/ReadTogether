import { findBooksByUserId } from "../models/user.js";

export const getCurrentUserBooks = async (userId) => {
  const userBooks = await findBooksByUserId(userId);
  return userBooks;
};
