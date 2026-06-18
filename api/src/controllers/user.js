import { getCurrentUserBorrowedService } from "../services/user.js";

export const getCurrentUserBorrowedController = async (req, res) => {
  try {
    const userId = req.user.id;

    const borrowedBooks = await getCurrentUserBorrowedService(userId);

    return res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error("Get Borrowed Books Controller Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching your borrowed books.",
    });
  }
};
