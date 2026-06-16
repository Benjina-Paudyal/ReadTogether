import bcrypt from "bcrypt";

export async function seed(knex) {
  await knex("Users").del();

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  await knex("Users").insert([
    {
      id: 1, // FIXED ID
      email: "admin@example.com",
      password_hash: adminPassword,
      name: "Admin",
      location: "Copenhagen",
      role: "admin",
    },
    {
      id: 2, // FIXED ID
      email: "ali@example.com",
      password_hash: userPassword,
      name: "ali",
      location: "Copenhagen",
      role: "normal_user",
    },
  ]);
}