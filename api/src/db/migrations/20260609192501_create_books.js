export async function up(knex) {
  await knex.schema.createTable("Books", (t) => {
    t.increments("id").primary();

    t.string("title").notNullable();
    t.text("description").nullable();

    // book cover image (URL or file path)
    t.string("cover_url").nullable();

    // book condition (good or damaged)
    t.string("condition").notNullable().defaultTo("good");

    // who posted the book
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");

    // category of the book
    t.integer("category_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("Category")
      .onDelete("SET NULL");

    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("Books");
}