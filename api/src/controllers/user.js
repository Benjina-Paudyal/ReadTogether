import { createNewUser } from "../services/user.js";
import { registerUserSchema } from "../validators/user.js";
import { findAllUsers, findUserById } from "../models/user.js";
import {
  getCurrentUserBooks,
  getCurrentUserBorrowedBooks,
} from "../services/user.js";

// A. Register User Controller
export const registerUser = async (req, res) => {
  try {
    // Validate request body using Zod schema
    const validatedData = registerUserSchema.parse(req.body);

    // Pass the safe, validated data to the service layer
    const newUser = await createNewUser(
      validatedData.name,
      validatedData.email,
      validatedData.password,
      validatedData.location
    );

    return res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    // Catch Zod validation errors specifically
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Bad Request",
        message: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Registration Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong on our end.",
    });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentUserBooksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await getCurrentUserBooks(userId);

    return res.status(200).json(books);
  } catch (error) {
    console.error("Get Books Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to retrieve your library.",
    });
  }
};

export const getCurrentUserBorrowedController = async (req, res) => {
  try {
    
    const userId = req.user.id;

    const borrowedBooks = await getCurrentUserBorrowedBooks(userId);

    return res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error("Get Borrowed Books Controller Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching your borrowed books.",
    });
  }
};
