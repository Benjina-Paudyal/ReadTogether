import { createUserService } from "../services/user.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    //Validate that the required fields are provided
    if (!name || !email || !password || !location) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Name, email password and location are required.",
      });
    }

    const newUser = await createUserService(name, email, password, location);

    return res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    // Catch custom errors thrown by the service (e.g., email already exists)
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // Fallback for unexpected server errors
    console.error("Registration Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong on our end.",
    });
  }
};
