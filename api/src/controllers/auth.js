import { authenticateUser } from "../services/user.js";

// Authenticate a user and issue a JWT token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authenticateUser(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    // Gracefully catch custom status codes (e.g., 401) from the service, or default to 500
    res.status(err.status || 500).json({ error: err.message });
  }
};
