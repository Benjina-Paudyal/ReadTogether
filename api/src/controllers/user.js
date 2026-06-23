import { createNewUser } from "../services/user.js";

// A. Register User Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Name, email password and location are required.",
      });
    }

    const newUser = await createNewUser(name, email, password, location);

    return res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
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
