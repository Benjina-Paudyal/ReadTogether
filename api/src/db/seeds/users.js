export async function seed(knex) {
  // clear existing users
  await knex("users").del();

  await knex("users").insert([
    {
      name: "John Doe",
      email: "john@example.com",
      password_hash: "hashed_password_123"
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password_hash: "hashed_password_456"
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password_hash: "hashed_password_789"
    }
  ]);
}