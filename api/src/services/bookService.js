import knex from "../configs/knex-config.js";

//CREATE
export const createBook = async (data, userId) => {
  const [book] = await knex("Books")
    .insert({
      title: data.title,
      description: data.description,
      cover_url: data.cover_url,
      condition: data.condition || "good",
      user_id: userId,
      category_id: data.category_id || null,
    })
    .returning("*");
  return book;
};

// READ (with FILTERS + PAGINATION)
export const getBooks = async (filters = {}) => {
  const {
    title,
    description,
    category_id,
    condition,
    page = 1,
    limit = 10,
  } = filters;

  const query = knex("Books");

  // filters
  if (title) {
    query.whereILike("title", `%${title}%`);
  }
  if (description) {
    query.whereILike("description", `%${description}%`);
  }
  if (category_id) {
    query.where("category_id", category_id);
  }
  if (condition) {
    query.where("condition", condition);
  }

  // pagination 
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const offset = (pageNumber - 1) * limitNumber;
  const totalQuery = query.clone();
  const totalResult = await totalQuery.count("* as count").first();
  const total = parseInt(totalResult.count);
  const data = await query.limit(limitNumber).offset(offset);

  return {
    data,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};


//READ BY ID
export const getBookById = async (id) => {
  return knex("Books").where({ id }).first();
};

export const checkAvailability = async (bookId) => {
  const book = await knex("Books").where({ id: bookId }).first();

  if (!book) {
    return { error: "Book not found" };
  }

  const activeRental = await knex("Rentals")
    .where({ book_id: bookId })
    .whereIn("status", ["requested", "approved", "rented"])
    .first();

  return {
    bookId,
    available: !activeRental,
    status: activeRental ? activeRental.status : "available",
  };
};


//UPDATE
export const updateBook = async (id, data, userId) => {
  const [book] = await knex("Books")
    .where({ id, user_id: userId })
    .update({
      title: data.title,
      description: data.description,
      cover_url: data.cover_url,
      category_id: data.category_id,
      condition: data.condition,
      updated_at: knex.fn.now(),
    })
    .returning("*");
  return book || null;
};

//DELETE
export const deleteBook = async (id, userId) => {
  const deleted = await knex("Books").where({ id, user_id: userId }).del();
  return deleted > 0;
};
