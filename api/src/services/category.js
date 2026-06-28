import { findCategoryByName, insertCategory } from "../models/category.js";

export async function createCategoryService(data) {
  const existing = await findCategoryByName(data.name);

  if (existing) {
    throw new Error("CATEGORY_EXISTS");
  }

  await insertCategory(data);

  return {
    message: "Category created successfully",
    name: data.name,
  };
}
