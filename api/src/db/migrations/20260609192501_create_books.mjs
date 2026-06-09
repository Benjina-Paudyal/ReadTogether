export async function up(knex) {
  await knex.schema.createTable("books", (t) => {
    t.increments("id").primary();

    t.string("title").notNullable();
    t.text("description").nullable();

    // book cover image (URL or file path)
    t.string("cover_url").nullable();

    // who posted the book
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // category of the book
    t.integer("category_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("category")
      .onDelete("SET NULL");

    // store where book is available
    t.integer("store_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("stores")
      .onDelete("SET NULL");

    // status of the book (available / rented)
    t.string("status")
      .notNullable()
      .defaultTo("available");

    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("books");
}

