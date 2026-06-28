import {
  findCategoryByName,
  insertCategory,
  getAllCategories,
  getCategoryById,
} from "../models/category.js";

// CREATE
export async function createCategoryService(data) {
  const existing = await findCategoryByName(data.name);

  if (existing) {
    throw new Error("CATEGORY_EXISTS");
  }

  const [category] = await insertCategory(data);
  return category;
}

// GET ALL
export async function getAllCategoriesService() {
  return await getAllCategories();
}

// GET BY ID
export async function getCategoryByIdService(id) {
  return await getCategoryById(id);
}