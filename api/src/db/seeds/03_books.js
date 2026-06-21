export async function seed(knex) {
  // clear books first
  await knex("Books").del();

  await knex("Books").insert([
    {
      title: "Clean Code",
      description: "A handbook of writing clean and maintainable code",
      cover_url: "https://example.com/covers/cleancode.jpg",
      user_id: 1,
      category_id: 4,
      condition: "good",
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      description: "A young wizard discovers his magical world",
      cover_url: "https://example.com/covers/harry1.jpg",
      user_id: 2,
      category_id: 7,
      condition: "good",
    },
    {
      title: "A Brief History of Time",
      description: "Exploring space, time and the universe",
      cover_url: "https://example.com/covers/time.jpg",
      user_id: 1,
      category_id: 3,
      condition: "good",
    },
    {
      title: "The Lean Startup",
      description: "How modern startups are built",
      cover_url: "https://example.com/covers/lean.jpg",
      user_id: 2,
      category_id: 4,
      condition: "good",
    },
    {
      title: "The Art of War",
      description: "Ancient military strategy text",
      cover_url: "https://example.com/covers/war.jpg",
      user_id: 1,
      category_id: 5,
      condition: "damaged",
    },
  ]);
}