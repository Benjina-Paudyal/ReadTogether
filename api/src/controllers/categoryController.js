// import { BookModel } from "../models/bookModel.js";
import { CategoryModel } from "../models/categoryModel.js";

export const getAll = async (req, res) => {
  try {
    const data = await CategoryModel.getAll();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const category = await CategoryModel.getById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const [created] = await CategoryModel.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: created,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.getById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await CategoryModel.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Benjina Paudyal (Dependency) so wait

// export const getBooksByCategory = async (req, res) => {
//   try {
//     const category = await CategoryModel.getById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     const books = await BookModel.getByCategory(req.params.id);

//     res.json({ category, books });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };