export async function seed(knex) {
  // clear existing users
  await knex("Users").del();

  await knex("Users").insert([
    {
      name: "John Doe",
      email: "john@example.com",
      password_hash: "hashed_password_123",
      location: "Nørrebrogade 45, 2200 København N",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password_hash: "hashed_password_456",
      location: "Vesterbrogade 120, 1620 København V",
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password_hash: "hashed_password_789",
      location: "Østerbrogade 78, 2100 København Ø",
    },
  ]);
}
