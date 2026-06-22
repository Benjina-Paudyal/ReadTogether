import { BcryptService } from "../services/encription.js";

const FAKE_USER = {
  id: 1,
  email: "test@example.com",
  role: "normal_user",
  passwordHash:
    "$2b$10$SETqkauqyHHn95OLeNrTM.YBc4o4CCCbcxdgVeiPVEmSjtDBUZrHK",
};

export async function login(email, password) {
  // 1. check email
  if (email !== FAKE_USER.email) {
    throw new Error("Invalid credentials");
  }

  // 2. use service (NOT bcrypt directly)
  const isMatch = await BcryptService.comparePassword(
    password,
    FAKE_USER.passwordHash
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. return safe user data
  return {
    id: FAKE_USER.id,
    email: FAKE_USER.email,
    role: FAKE_USER.role,
  };
}