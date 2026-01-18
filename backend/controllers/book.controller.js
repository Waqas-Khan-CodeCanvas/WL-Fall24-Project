const Book = require("../model/Book.model.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

exports.createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, data: book });
});

exports.getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.json({ success: true, data: books });
});

exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new ApiError(404, "Book not found");
  res.json({ success: true, data: book });
});

exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw new ApiError(404, "Book not found");
  res.json({ success: true, message: "Book deleted" });
});
