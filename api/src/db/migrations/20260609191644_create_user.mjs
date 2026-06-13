export async function up(knex) {
  await knex.schema.createTable("Users", (t) => {
    t.increments("id").primary();
    t.string("email").notNullable().unique();
    t.string("password_hash").notNullable();
    t.string("name").notNullable();
    t.string("location").notNullable();

    //role (normal_user, admin)
    t.string("role").notNullable().defaultTo("normal_user");

    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("Users");
}
