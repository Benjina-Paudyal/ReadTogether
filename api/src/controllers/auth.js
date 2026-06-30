import { authenticateUser } from "../services/auth.js";
import { loginSchema } from "../validators/auth.js";

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const token = await authenticateUser(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ error: "Bad Request", details: err.errors });
    }
    res.status(err.status || 500).json({ error: err.message });
  }
};
