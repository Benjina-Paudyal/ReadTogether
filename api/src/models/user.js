import connection from "../configs/knex-config.js";

export const findUserByEmail = async (email) => {
  return await connection("Users").where({ email }).first(); // Returns the user record if found, or undefined
};

// Insert a new user into the database
export const createUser = async (userData) => {
  const [newUser] = await connection("Users")
    .insert(userData)
    .returning(["id", "name", "email", "location", "created_at"]);

  return newUser;
};
