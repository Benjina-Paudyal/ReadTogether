import connection from "../configs/knex-config.js";

export async function createRental(data) {
  const [rental] = await connection("Rentals")
    .insert({
      ...data,
      status: "requested",
      request_date: connection.fn.now(),
    })
    .returning("*");

  return rental;
}

export async function getRentalById(id) {
  return connection("Rentals")
    .where({ id })
    .first();
}

export async function approveRentalRequest(id, dueDate) {
  const [rental] = await connection("Rentals")
    .where({ id })
    .update({
      status: "approved",
      due_date: dueDate,
      updated_at: connection.fn.now(),
    })
    .returning("*");

  return rental;
}