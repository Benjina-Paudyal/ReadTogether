import connection from "../configs/knex-config.js";

export function findCategoryByName(name) {
  return connection("Category").where({ name }).first();
}

export function insertCategory(data) {
  return connection("Category").insert(data);
}