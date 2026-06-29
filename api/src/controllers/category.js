import { createCategorySchema } from "../validators/category.js";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
} from "../services/category.js";

// CREATE
export async function createCategory(req, res) {
  try {
    const data = createCategorySchema.parse(req.body);

    const category = await createCategoryService(data);

    return res.status(201).json(category);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    }

    if (err.message === "CATEGORY_EXISTS") {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    console.error("Error creating category:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// GET ALL
export async function getCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    return res.status(200).json(categories);
  } catch (err) {
    console.error("Error getting categories:", err);
    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
}

// GET BY ID
export async function getCategoryById(req, res) {
  try {
    const category = await getCategoryByIdService(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

   return res.status(200).json(category);
  } catch (err) {
    if (err.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({ message: "Category not found" });
    }

    console.error("Error getting category by id:", err);
    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
}
