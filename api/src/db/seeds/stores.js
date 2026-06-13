export async function seed(knex) {
  // Clear existing data
  await knex("stores").del();

  // Seed data
  await knex("stores").insert([
    {
      name: " - Nørrebro",
      address: "Nørrebrogade 45, 2200 Copenhagen",
      city: "Copenhagen",
    },
    {
      name: " - Fisketorvet",
      address: "Kalvebod Brygge 59, 1560 Copenhagen",
      city: "Copenhagen",
    },
    {
      name: " - Fields",
      address: "Arne Jacobsens Allé 12, 2300 Copenhagen",
      city: "Copenhagen",
    },
  ]);
}