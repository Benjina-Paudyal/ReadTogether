import connection from "../configs/knex-config.js";

// Get all users
export const findAllUsers = async () => {
  return await connection("Users").select(
    "id",
    "name",
    "email",
    "location",
    "created_at"
  );
};

// Find a specific user by ID
export const findUserById = async (id) => {
  return await connection("Users")
    .where({ id })
    .select("id", "name", "email", "location", "role","created_at")
    .first();
};

// Get user by email (Kept for internal use by Auth/Registration workflows)
export const findUserByEmail = async (email) => {
  return await connection("Users")
    .where({ email })
    .select("id", "name", "email", "location", "role", "created_at", "password_hash")
    .first();
};

// Insert a new user into the database
export const createUser = async (userData) => {
  const [newUser] = await connection("Users")
    .insert(userData)
    .returning(["id", "name", "email", "location", "created_at"]);

  return newUser;
};
