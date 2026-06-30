import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .trim()
    .min(1, "Category name is required"),
});