import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  location: z.string().trim().min(1, "Location is required"),
});
