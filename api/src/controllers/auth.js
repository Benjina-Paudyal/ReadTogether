import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "../database_client.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, location } = req.body;

    // 1. Core MVP validation
    if (!name || !email || !password || !location) {
      const error = new Error(
        "Name, email, password, and location are required"
      );
      error.status = 400;
      throw error;
    }

    // 2. Check if user already exists in your Postgres 'Users' table
    const existingUser = await knex("Users").where({ email }).first();
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.status = 409;
      throw error;
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert into PostgreSQL
    const [newUser] = await knex("Users")
      .insert({
        name,
        email,
        password_hash: hashedPassword,
        location,
      })
      .returning(["id", "name", "email", "location"]);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};
