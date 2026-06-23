import connection from "../configs/knex-config.js";

export function getAllCategories() {
  return connection("Category").select("*");
}

export function getCategoryById(id) {
  return connection("Category").where({ id }).first();
}

export function createCategory(data) {
  return connection("Category").insert(data).returning("*");
}

export function deleteCategory(id) {
  return connection("Category").where({ id }).del();
}


