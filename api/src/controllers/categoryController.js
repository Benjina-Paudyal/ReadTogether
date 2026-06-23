// import { BookModel } from "../models/bookModel.js";
import { getAllCategories,getCategoryById,createCategory,deleteCategory } from "../models/categoryModel.js";

export const getAll = async (req, res) => {
  try {
    const data = await getAllCategories();

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
    const category = await getCategoryById(req.params.id);

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

    const [created] = await createCategory({
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

export const deleteCategory_ = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await deleteCategory(req.params.id);

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

