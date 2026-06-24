import { createNewUser } from "../services/user.js";
import { registerUserSchema } from "../validators/user.js";

// A. Register User Controller
export const registerUser = async (req, res) => {
  try {
    // Validate request body using Zod schema
    const validatedData = registerUserSchema.parse(req.body);

    // Pass the safe, validated data to the service layer
    const newUser = await createNewUser(
      validatedData.name,
      validatedData.email,
      validatedData.password,
      validatedData.location
    );

    return res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    // Catch Zod validation errors specifically
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Bad Request",
        message: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

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
