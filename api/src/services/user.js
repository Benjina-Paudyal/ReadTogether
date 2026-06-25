import {
  findBooksByUserId,
  findBorrowedBooksByUserId,
  findActiveRentalsByBorrowerId,
} from "../models/book.js";

export const getCurrentUserBooks = async (userId) => {
  return await findBooksByUserId(userId);
};

export const getCurrentUserBorrowedBooks = async (userId) => {
  const books = await findBorrowedBooksByUserId(userId);
  const rentals = await findActiveRentalsByBorrowerId(userId);
  return books.map((book) => {
    const matchingRental = rentals.find((r) => r.book_id === book.id);
    return {
      book_id: book.id,
      title: book.title,
      description: book.description,
      rental_id: matchingRental ? matchingRental.rental_id : null,
      status: matchingRental ? matchingRental.status : null,
      due_date: matchingRental ? matchingRental.due_date : null,
    };
  });
};
