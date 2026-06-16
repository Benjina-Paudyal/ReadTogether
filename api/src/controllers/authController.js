import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";

// JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET;
// JWT_EXPIRES_IN from .env (1 day)
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const AuthController = {
  // login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password)
      // check existance of email (AuthModel.findByEmail) using dot notation
      const user = await AuthModel.findByEmail(email);
      // if email doesnot exist
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // if email exit and then check password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      //   if not match
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      //   if match (then create token) and pass payload
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );
      //   sending response from of json object
      res.json({
        message: "Login successful",
        token,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
