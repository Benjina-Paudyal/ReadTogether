import { createCategoryService,  getAllCategoriesService, getCategoryByIdService, } from "../services/category.js";

export async function createCategory(req, res) {
  try {
    const category = await createCategoryService(req.body);

    return res.status(201).json(category);
  } catch (err) {
    if (err.message === "CATEGORY_EXISTS") {
      return res.status(400).json({ message: "Category already exists" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function getCategoryById(req, res) {
  try {
    const category = await getCategoryByIdService(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}