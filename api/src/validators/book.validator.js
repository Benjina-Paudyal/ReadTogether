import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  cover_url: z.string().url().optional().nullable(),
  condition: z.enum(["good", "fair", "poor", "damaged"]).optional(),
  category_id: z.number().int().optional().nullable(),
  user_id: z
    .number({
      required_error: "User is required",
      invalid_type_error: "User must be a number",
    })
    .int()
    .positive(),
});
