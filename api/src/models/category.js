import connection from "../configs/knex-config.js";

export function findCategoryByName(name) {
  return connection("Category").where({ name }).first();
}

export const insertCategory = async (data) => {
  return await connection("Category")
    .insert(data)
    .returning("*");
};

export function getAllCategories() {
  return connection("Category").select("*");
}

export function getCategoryById(id) {
  return connection("Category").where({ id }).first();
}