import { findBookById } from "../../models/book.js";

export async function canModifyBook(user, bookId) {
  const book = await findBookById(bookId);

  if (!book) {
    return { allowed: false, reason: "NOT_FOUND" };
  }

  const allowed =
    user.role === "admin" || book.user_id === user.id;

  return { allowed, book };
}