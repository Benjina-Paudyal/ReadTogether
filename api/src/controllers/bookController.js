import * as bookService from "../services/bookService.js";

// CREATE BOOK
export const createBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const book = await bookService.createBook(req.body, userId);

    res.status(201).json({
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BOOKS (WITH SEARCH)
export const getBooks = async (req, res) => {
  try {
    const result = await bookService.getBooks(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BOOK BY ID
export const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
   res.json({ data: book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// AVAILABILITY CHECK
export const getAvailability = async (req, res) => {
  try {
    const result = await bookService.checkAvailability(req.params.id);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    const updatedBook = await bookService.updateBook(bookId, req.body, userId);

    res.json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE BOOK
export const deleteBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    const deleted = await bookService.deleteBook(bookId, userId);
    
    if (!deleted) {
      return res.status(404).json({
        message: "Book not found or not owned by user",
      });
    }
    res.json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
