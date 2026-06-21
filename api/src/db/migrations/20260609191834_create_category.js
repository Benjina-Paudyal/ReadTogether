export async function up(knex) {
  await knex.schema.createTable("Category", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable().unique();
    t.text("description"); 
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("Category");
}