import reviewsModel from "../models/reviewModel.js";

const getReviewsService = async (params, callback) => {
  try {
    const { page, limit, skip, query } = params;

    let reviews = await reviewsModel
      .find(query)
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await reviewsModel.count();

    return callback(false, {
      success: true,
      reviews,
      page : Number(page),
      pages: Math.ceil(totalCount / limit),
      limit : Number(limit),
      totalCount,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

const addReviewsService = async (params, callback) => {
  try {
    const { bookID, userID, rating, comment } = params;

    const review = new reviewsModel({
      book_id: bookID,
      user_id: userID,
      rating,
      comment,
    });

    await review.save();

    return callback(false, {
      success: true,
      review,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

export { addReviewsService, getReviewsService };
