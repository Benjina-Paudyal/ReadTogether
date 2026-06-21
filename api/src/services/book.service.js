import {
  findAllBooks,
  countAllBooks,
  findBookById,
} from "../models/book.model.js";

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
