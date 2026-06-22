import { login as authLogin } from "../services/auth.js";
import { JwtService } from "../services/jwt.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // call service function
    const user = await authLogin(email, password);

    // generate JWT in controller
    const token = JwtService.issueToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}