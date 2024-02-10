import mongoose from "mongoose";
import { modelsName } from "../utils/constants.js";
import { updateBookService } from "../services/bookService.js";
import ErrorHandles from "../utils/error.js";

const reviewModule = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Types.ObjectId,
      ref: modelsName.BOOKS,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: modelsName.USERS,
    },
    rating: {
      type: Number,
      required: [true, "Please rate the book"],
      min: [0, "Rating should be in b/w 0-5"],
      max: [5, "Rating should be in b/w 0-5"],
    },
    comment: {
      type: String,
      required: [true, "Please comment on book"],
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

reviewModule.pre("save", async function (next) {
  
  if (this.isNew) {
    try {
      const filter = { _id: this.book_id };
      const updateQuery = {
        $inc: { numOfReviews: 1, totalRating: this.rating },
      };
      await updateBookService({ filter, updateQuery }, (err, result) => {
        if (err) {
          return next(new ErrorHandles(err?.message, 400));
        } else {
          next();
        }
      });
    } catch (error) {
      return next(new ErrorHandles(error?.message, 400));
    }
  }else{
    next()
  }
});

export default mongoose.model(modelsName.REVIEWS, reviewModule);
