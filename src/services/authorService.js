import authorModel from "../models/authorModel.js";

const createAuthorService = async (params, callback) => {
  try {
    const { userID, totalStock } = params;

    const author = new authorModel({
      _id: userID,
      totalStock,
    });
    console.log("createAuthorService" , author)
    await author.save();

    return callback(false, {
      success: true,
      author,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

// hide book
// 

export { createAuthorService };
