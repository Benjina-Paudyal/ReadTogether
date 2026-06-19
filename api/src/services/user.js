import connection from "../configs/knex-config.js";
import bcrypt from "bcrypt";

export const createUserService = async (name, email, password, location) => {
  // Check if user already exists
  const existingUser = await connection("Users").where({ email }).first();
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  // Securely hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [newUser] = await connection("Users")
    .insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password_hash: hashedPassword,
      location: location.trim(),
    })
    .returning(["id", "name", "email", "location", "created_at"]);

  return newUser;
};
