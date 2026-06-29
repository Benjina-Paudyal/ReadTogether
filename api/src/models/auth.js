import connection from "../configs/knex-config.js";

// Check existence of email and retrieve user credentials
export const findUserByEmail = async (email) => {
  return await connection("Users").where({ email }).first();
};
