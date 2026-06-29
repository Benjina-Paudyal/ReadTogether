import { verifyToken } from "../services/jwt.js";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);

    return res.status(401).json({
      message: "Unauthorized - invalid or expired token",
    });
  }
}