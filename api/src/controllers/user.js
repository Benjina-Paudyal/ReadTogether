import { getCurrentUserBooksService } from "../services/user.js";

export const getCurrentUserBooksController = async (req, res) => {
  try {
    //Extract the user ID attached by the authentication middleware
    const userId = req.user.id;

    const books = await getCurrentUserBooksService(userId);

    return res.status(200).json(books);
  } catch (error) {
    console.error("Get Books Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to retrieve your library.",
    });
  }
};
