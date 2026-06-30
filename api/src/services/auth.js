import { BcryptService } from "./encryption.js";
import { issueToken } from "./jwt.js";
import { findUserByEmail } from "../models/user.js";

//Authenticates a user and returns a signed token
export const authenticateUser = async (email, password) => {
  // 1. Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  // 2. Compare password via your encryption wrapper service
  const isMatch = await BcryptService.comparePassword(
    password,
    user.password_hash
  );
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  // 3. Delegate token creation to your project's issueToken service
  const token = issueToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return token;
};
