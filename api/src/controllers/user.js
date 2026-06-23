import { findAllUsers, findUserById } from "../models/user.js";
import {
  getCurrentUserBooks,
  getCurrentUserBorrowedBooks,
} from "../services/user.js";

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
    const userId = req.user.id; // Attached by auth middleware
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
