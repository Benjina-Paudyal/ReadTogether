import {
  getAllBooks as getAllBooksService,
  getBookById as getBookByIdService,
} from "../services/book.service.js";

export async function getBooks(req, res) {
  try {
    const result = await getAllBooksService(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error in getBooks:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function getBookById(req, res) {
  try {
    const book = await getBookByIdService(req.params.id);
    res.json(book);
  } catch (err) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }

    console.error(`Error in getBookById for ID ${req.params.id}:`, err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}
