import {
  findBooksByUserId,
  findBorrowedBooksByUserId,
} from "../models/user.js";

export const getCurrentUserBooks = async (userId) => {
  const userBooks = await findBooksByUserId(userId);
  return userBooks;
};

export const getCurrentUserBorrowedBooks = async (userId) => {
  const borrowedBooks = await findBorrowedBooksByUserId(userId);
  return borrowedBooks;
};
