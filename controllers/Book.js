import Book from "../models/Book.js";
import { createError } from "../utils/createError.js";

// CREATE aLL COURSES
const createBook = async (req, res, next) => {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (error) {
    next(error);
  }
};

// GET ALL BOOKS
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// GET BOOK
const getBookByID = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).send(`New Book found with the ${req.params.id}`);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// UPDATE BOOK
const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedBook)
      return next(createError(404, `No Book found with ${req.params.id}`));

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// DELETE COURSE
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).send(`New Book found with the ${req.params.id}`);

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send("Book has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export { createBook, getBooks, getBookByID, updateBook, deleteBook };
