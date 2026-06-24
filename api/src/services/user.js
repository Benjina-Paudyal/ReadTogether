// TODO: Refactor to modular exports once the service/model migration is completed.
// Replace object-based export with direct function exports.

import { BcryptService } from "./encryption.js";
import { createUser, findUserByEmail } from "../models/user.js";

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
