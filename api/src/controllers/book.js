import {
  getAllBooks as getAllBooksService,
  getBookById as getBookByIdService,
  createNewBook as createBookService,
  updateBook as updateBookService,
  deleteBook as deleteBookService,
  checkBookAvailability,
} from "../services/book.js";


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

export async function createBook(req, res) {
  try {
    const newBook = await createBookService({
      ...req.body,
      user_id: req.body.user_id, // TO DO: req.user.id WHEN MIDDLEWARE CREATED
    });

    return res.status(201).json(newBook);
  } catch (err) {
    console.error("Error creating book:", err);
    return res.status(500).json({ message: "Failed to create book" });
  }
}

export async function updateBook(req, res) {
  try {
    const updatedBook = await updateBookService(req.params.id, {
      ...req.body,
      user_id: req.body.user_id, // TO DO: req.user.id (WHEN MIDDLEWARE)
    });

    return res.json(updatedBook);
  } catch (err) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }

    console.error(`Error updating book ${req.params.id}:`, err);
    return res.status(500).json({ message: "Failed to update book" });
  }
}

export async function deleteBook(req, res) {
  try {
    const result = await deleteBookService(req.params.id);

    return res.json(result);
  } catch (err) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }
    console.error(`Error deleting book ${req.params.id}:`, err);
    return res.status(500).json({ message: "Failed to delete book" });
  }
}

export async function getAvailability(req, res) {
  try {
    const result = await checkBookAvailability(req.params.id);
    res.json({
      data: result,
    });
  } catch (err) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }
    console.error("Error in getAvailability:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}