import db from "../configs/knex-config.js";

function applyBookFilters(query, { search, category }) {
  if (search) {
    query.where(function () {
      this.whereILike("Books.title", `%${search}%`).orWhereILike(
        "Books.description",
        `%${search}%`,
      );
    });
  }

  if (category) {
    query.whereILike("Category.name", category);
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
      "Category.name as category_name",
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
      "Category.name as category_name",
    )
    .where("Books.id", id)
    .first();
}
