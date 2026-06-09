export async function up(knex) {
  await knex.schema.createTable("stores", (t) => {
    t.increments("id").primary();

    t.string("name").notNullable();
    t.string("address").nullable();
    t.string("city").notNullable().defaultTo("Copenhagen");

    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("stores");
}