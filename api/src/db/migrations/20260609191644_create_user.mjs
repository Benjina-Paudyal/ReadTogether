export async function up(knex) {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("email").notNullable().unique();
    t.string("password_hash").notNullable();
    t.string("name").notNullable();

    // role (normal_user, admin)
    t.string("role").notNullable().defaultTo("normal_user");

    // location (nullable by default)
    t.string("location");

    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}