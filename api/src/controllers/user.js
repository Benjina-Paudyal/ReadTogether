import { findAllUsers, findUserById, findUserByEmail } from "../models/user.js";

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

// Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await findUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get User By Email Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
