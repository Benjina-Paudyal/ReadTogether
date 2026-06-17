export async function up(knex) {
  await knex.schema.createTable("Category", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable().unique();
    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("Category");
}
