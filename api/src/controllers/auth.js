import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/auth.js";

// JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET;
// JWT_EXPIRES_IN from .env (1 day)
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Authenticate a user and issue a JWT token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existence of email (AuthModel.findByEmail) using dot notation
    const user = await findUserByEmail(email);

    // if email doesn't exist
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // if email exists, check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // if not match
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //   if match (then create token) and pass payload
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    //   sending response from of json object
    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
