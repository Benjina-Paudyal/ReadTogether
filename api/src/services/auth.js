const FAKE_USER = {
  id: 1,
  email: "test@example.com",
  role: "normal_user",
  passwordHash:
    "$2b$10$7hKq7s9wB7vJ3qX4v1oN2eM9d0s3uYJ6Y4xGfLr5D8kN1tPzQwR7S",
};

export async function login(email, password) {
  // 1. check email
  if (email !== FAKE_USER.email) {
    throw new Error("Invalid credentials");
  }

  // 2. check password (TEMP FIX)
  const isMatch = password === "123456";

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. return user
  return {
    id: FAKE_USER.id,
    email: FAKE_USER.email,
    role: FAKE_USER.role,
  };
}