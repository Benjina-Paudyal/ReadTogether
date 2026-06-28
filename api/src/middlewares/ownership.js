import knex from "../configs/knex-config.js";

export const canModifyBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    const book = await knex("Books").where({ id: bookId }).first();

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.user_id !== userId) {
      return res.status(403).json({ message: "You are not the owner of this book." });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};