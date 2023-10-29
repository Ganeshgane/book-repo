import express from "express";
import {
  createBook,
  deleteBook,
  getBookByID,
  getBooks,
  updateBook,
} from "../controllers/Book.js";

const router = express.Router();

router.post("/", createBook);
router.get("/:id", getBookByID);
router.get("/", getBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
