export async function seed(knex) {
  await knex("Category").del();

  await knex("Category").insert([
    { name: "Fiction", description: "Imaginative storytelling and novels" },
    { name: "Non-Fiction", description: "Real-world factual books" },
    { name: "Science", description: "Scientific concepts and discoveries" },
    { name: "Technology", description: "Tech, programming, and innovation" },
    { name: "History", description: "Historical events and timelines" },
    { name: "Biography", description: "Life stories of real people" },
    { name: "Fantasy", description: "Magical and fictional worlds" },
    { name: "Horror", description: "Scary and suspenseful stories" },
    { name: "Romance", description: "Love and relationship stories" },
    { name: "Education", description: "Learning and academic content" },
  ]);
}