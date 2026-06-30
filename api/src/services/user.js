import { findBooksByUserId } from "../models/book.js";
import { findActiveRentalsWithBooksByBorrowerId } from "../models/rental.js";

import { BcryptService } from "./encryption.js";
import { issueToken } from "./jwt.js";
import { createUser, findUserByEmail } from "../models/user.js";

export const getCurrentUserBooks = async (userId) => {
  return await findBooksByUserId(userId);
};

export const getCurrentUserBorrowedBooks = async (userId) => {
  const activeRentals = await findActiveRentalsWithBooksByBorrowerId(userId);
  return activeRentals.map((rental) => ({
    rental_id: rental.rental_id,
    status: rental.status,
    due_date: rental.due_date,
    book: {
      id: rental.book_id,
      title: rental.title,
      description: rental.description,
    },
  }));
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
