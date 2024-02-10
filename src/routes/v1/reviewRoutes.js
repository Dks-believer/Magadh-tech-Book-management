import { Router } from "express";
import {
    onlyaccessBy,
    isAuthenticated,
    isAccessable,
  } from "../../middleware/authMiddleware.js";
import { userType } from "../../utils/constants.js";
import { addReviews ,getAllReviews } from "../../controller/reviewController.js";


const reviewRoutes = Router();

reviewRoutes.get(
  "/allReviews",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  getAllReviews
);

reviewRoutes.post(
  "/addReviews",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  addReviews
);


export default  reviewRoutes
