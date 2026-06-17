export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("Category").del();

  // Inserts seed entries
  await knex("Category").insert([
    { name: "Fiction" },
    { name: "Non-Fiction" },
    { name: "Science" },
    { name: "Technology" },
    { name: "History" },
    { name: "Biography" },
    { name: "Fantasy" },
    { name: "Horror" },
    { name: "Romance" },
    { name: "Education" },
  ]);
}
