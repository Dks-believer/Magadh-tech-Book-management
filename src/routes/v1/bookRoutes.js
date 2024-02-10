import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookDetails,
  updateBooks,
  deleteBooks,
} from "../../controller/bookController.js";
import {
    onlyaccessBy,
    isAuthenticated,
    isAccessable,
  } from "../../middleware/authMiddleware.js";
import { userType } from "../../utils/constants.js";
const bookRoutes = Router();

bookRoutes.get(
  "/allBooks",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  getAllBooks
);

bookRoutes.post(
  "/createBooks",
  isAuthenticated,
  onlyaccessBy.bind([userType.AUTHORS]),
  isAccessable,
  createBook
);

bookRoutes.get(
  "/BookDetails",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  getBookDetails
);

bookRoutes.patch(
  "/updateBooks",
  isAuthenticated,
  onlyaccessBy.bind([userType.AUTHORS]),
  isAccessable,
  updateBooks
);

bookRoutes.delete(
  "/deleteBooks",
  isAuthenticated,
  onlyaccessBy.bind([userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  deleteBooks
);

export default bookRoutes;
