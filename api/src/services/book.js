import {
  findAllBooks,
  countAllBooks,
  findBookById,
  createBook as createBookModel,
  updateBook as updateBookModel,
  deleteBook as deleteBookModel,
} from "../models/book.js";

import { findActiveRentalByBookId } from "../models/rental.js";

export async function getAllBooks(query) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;
  const [books, countResult] = await Promise.all([
    findAllBooks({
      limit,
      offset,
      search: query.search,
      category: query.category,
    }),
    countAllBooks({
      search: query.search,
      category: query.category,
    }),
  ]);

  const total = Number(countResult?.total) || 0;
  return {
    data: books,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getBookById(id) {
  const book = await findBookById(id);
  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }
  return book;
}

export async function createNewBook(bookData) {
  return await createBookModel(bookData);
}

export async function updateBook(id, bookData) {
  const existingBook = await findBookById(id);

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return await updateBookModel(id, bookData);
}

export async function deleteBook(id) {
  const existingBook = await findBookById(id);

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  await deleteBookModel(id);

  return { message: "Book deleted successfully" };
}

export async function checkBookAvailability(id) {
  const book = await findBookById(id);
  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }
  const rental = await findActiveRentalByBookId(id);
  return {
    bookId: book.id,
    available: rental ? false : true,
    status: rental ? rental.status : "available",
  };
}
