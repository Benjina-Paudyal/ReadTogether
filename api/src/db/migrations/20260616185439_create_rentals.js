export async function up(knex) {
  await knex.schema.createTable("Rentals", (t) => {
    t.increments("id").primary();

    // Book being requested
    t.integer("book_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Books")
      .onDelete("CASCADE");

    // Borrower
    t.integer("borrower_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");

    // Request status
    t.string("status").notNullable().defaultTo("requested");

    // Lifecycle timestamps
    t.timestamp("request_date").nullable();
    t.timestamp("due_date").nullable();
    t.timestamp("returned_date").nullable();

    // Manual columns
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("Rentals");
}