import {
  findBooksByUserId,
  findBorrowedBooksByUserId,
  findActiveRentalsByBorrowerId,
} from "../models/book.js";

import { BcryptService } from "./encryption.js";
import { createUser, findUserByEmail } from "../models/user.js";

export const getCurrentUserBooks = async (userId) => {
  return await findBooksByUserId(userId);
};

export const getCurrentUserBorrowedBooks = async (userId) => {
  const books = await findBorrowedBooksByUserId(userId);
  const rentals = await findActiveRentalsByBorrowerId(userId);
  return books.map((book) => {
    const matchingRental = rentals.find((r) => r.book_id === book.id);
    return {
      book_id: book.id,
      title: book.title,
      description: book.description,
      rental_id: matchingRental ? matchingRental.rental_id : null,
      status: matchingRental ? matchingRental.status : null,
      due_date: matchingRental ? matchingRental.due_date : null,
    };
  });
};
// TODO: Refactor to modular exports once the service/model migration is completed.
// Replace object-based export with direct function exports.

export const createNewUser = async (name, email, password, location) => {
  const sanitizedEmail = email.toLowerCase().trim();

  // 1. Check if user already exists
  const existingUser = await findUserByEmail(sanitizedEmail);
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  // 2. Hash the password using the utility service
  const hashedPassword = await BcryptService.hashPassword(password);

  // 3. Save to database using the Model layer
  const newUser = await createUser({
    name: name.trim(),
    email: sanitizedEmail,
    password_hash: hashedPassword,
    location: location.trim(),
  });

  return newUser;
};
