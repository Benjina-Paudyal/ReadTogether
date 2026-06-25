import connection from "../configs/knex-config.js";
import { RENTAL_STATUS } from "../constants/rentalStatuses.js";

function applyBookFilters(query, { search, category }) {
  if (search) {
    query.where(function () {
      this.whereILike("Books.title", `%${search}%`).orWhereILike(
        "Books.description",
        `%${search}%`
      );
    });
  }
  if (category) {
    query.where("Category.name", category);
  }
  return query;
}

// GET ALL BOOKS
export function findAllBooks({ limit = 10, offset = 0, search, category }) {
  let query = db("Books")
    .leftJoin("Category", "Books.category_id", "Category.id")
    .select(
      "Books.id",
      "Books.title",
      "Books.description",
      "Books.cover_url",
      "Books.condition",
      "Books.user_id",
      "Books.created_at",
      "Books.updated_at",
      "Category.name as category_name"
    );
  query = applyBookFilters(query, { search, category });
  return query.limit(Number(limit)).offset(Number(offset));
}

// COUNT (for pagination)
export function countAllBooks({ search, category }) {
  let query = db("Books")
    .leftJoin("Category", "Books.category_id", "Category.id")
    .count("Books.id as total");
  query = applyBookFilters(query, { search, category });
  return query.first();
}

// GET BOOK BY ID
export function findBookById(id) {
  return db("Books")
    .leftJoin("Category", "Books.category_id", "Category.id")
    .select(
      "Books.id",
      "Books.title",
      "Books.description",
      "Books.cover_url",
      "Books.condition",
      "Books.user_id",
      "Books.created_at",
      "Books.updated_at",
      "Category.name as category_name"
    )
    .where("Books.id", id)
    .first();
}

// CREATE BOOK
export async function createBook(bookData) {
  const [newBook] = await db("Books")
    .insert({
      title: bookData.title,
      description: bookData.description,
      cover_url: bookData.cover_url,
      condition: bookData.condition,
      category_id: bookData.category_id,
      user_id: bookData.user_id,
    })
    .returning([
      "id",
      "title",
      "description",
      "cover_url",
      "condition",
      "category_id",
      "user_id",
      "created_at",
      "updated_at",
    ]);

  return newBook;
}

//UPDATE BOOK
export async function updateBook(id, bookData) {
  const [updatedBook] = await db("Books").where("id", id).update(
    {
      title: bookData.title,
      description: bookData.description,
      cover_url: bookData.cover_url,
      condition: bookData.condition,
      category_id: bookData.category_id,
    },
    [
      "id",
      "title",
      "description",
      "cover_url",
      "condition",
      "category_id",
      "user_id",
      "created_at",
      "updated_at",
    ]
  );

  return updatedBook;
}

//DELETE
export async function deleteBook(id) {
  return await db("Books").where("id", id).del();
}

//Fetch all books belonging to a specific user from the Books table
export const findBooksByUserId = async (userId) => {
  return await connection("Books").where({ user_id: userId }).select("*");
};

// Fetch all books borrowed by a specific user
export const findBorrowedBooksByUserId = async (userId) => {
  return await connection("Rentals")
    .join("Books", "Rentals.book_id", "=", "Books.id")
    .where("Rentals.borrower_id", userId)
    .andWhere("Rentals.status", RENTAL_STATUS.RENTED)
    .select("Books.*");
};

// Fetch rental records for service layer mapping
export const findActiveRentalsByBorrowerId = async (userId) => {
  return await connection("Rentals")
    .where({ borrower_id: userId, status: RENTAL_STATUS.RENTED })
    .select("id as rental_id", "book_id", "status", "due_date");
};
