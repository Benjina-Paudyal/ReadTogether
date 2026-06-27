import { z } from "zod";

export const createRentalSchema = z.object({
  book_id: z
    .number({
      required_error: "Missing required field: book_id",
      invalid_type_error: "book_id must be an integer number",
    })
    .int()
    .positive(),
});
