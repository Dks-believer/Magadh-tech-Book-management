import httpStatus from "http-status";
import ErrorHandles from "../utils/error.js";
import { addReviewsService ,getReviewsService } from "../services/reviewService.js";
import { isBookExist, isBookYours } from "../services/bookService.js";

const getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, rating, type, id } = req.query;
    let skip = (Number(page) - 1) * limit;
    let query = {};

    if (id) {
      query["book_id"] = id;
    }
    if (type) {
      query["type"] = type;
    }

    if (rating) {
      const ratingQuery = {};
      if (rating["$gt"]) {
        ratingQuery["$gt"] = parseFloat(rating["$gt"]);
      }
      if (rating["$lt"]) {
        ratingQuery["$lt"] = parseFloat(rating["$lt"]);
      }
      if (rating["$gte"]) {
        ratingQuery["$gte"] = parseFloat(rating["$gte"]);
      }
      if (rating["$lte"]) {
        ratingQuery["$lte"] = parseFloat(rating["$lte"]);
      }
      query["rating"] = { ...ratingQuery };
    }
    await getReviewsService(
      { page, limit, skip, query },
      (err, result) => {
        if (err) {
          return next(new ErrorHandles(err?.message, httpStatus.BAD_REQUEST));
        } else {
          return res.status(httpStatus.OK).json(result);
        }
      }
    );


  } catch (error) {
    return next(new ErrorHandles(error?.message, httpStatus.BAD_REQUEST));
  }
};

const addReviews = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const { bookID } = req.query;
    const { comment, rating } = req.body;

    const result = await isBookExist({ id: bookID });

    if (result?.success) {
      const isYours = isBookYours({
        userId: userID,
        bookDetails: result?.book,
      });

      // restrict the author of book to add reviews
      if (!isYours?.success) {
        await addReviewsService(
          { bookID, userID, rating, comment },
          (err, result) => {
            if (err) {
              return next(
                new ErrorHandles(err?.message, httpStatus.BAD_REQUEST)
              );
            } else {
              return res.status(httpStatus.OK).json(result);
            }
          }
        );
      } else {
        return next(
          new ErrorHandles(
            "You are not allowed to add reviews in your own books",
            httpStatus.BAD_REQUEST
          )
        );
      }
    } else {
      return next(new ErrorHandles(result?.message, httpStatus.BAD_REQUEST));
    }
  } catch (error) {
    return next(new ErrorHandles(error?.message, httpStatus.BAD_REQUEST));
  }
};

export { addReviews  , getAllReviews};
