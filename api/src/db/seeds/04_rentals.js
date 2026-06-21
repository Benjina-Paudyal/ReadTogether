export async function seed(knex) {
  // clear existing rentals
  await knex("Rentals").del();

  await knex("Rentals").insert([
    {
      book_id: 1,
      borrower_id: 2,
      status: "requested",
      request_date: new Date(),
      due_date: null,
      returned_date: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      book_id: 2,
      borrower_id: 1,
      status: "approved",
      request_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returned_date: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      book_id: 3,
      borrower_id: 2,
      status: "returned",
      request_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      returned_date: new Date(),
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updated_at: new Date(),
    },
  ]);
}