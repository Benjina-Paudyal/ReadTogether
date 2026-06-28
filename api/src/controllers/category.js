import { createCategoryService } from "../services/category.js";

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
