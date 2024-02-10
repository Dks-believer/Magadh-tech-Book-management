import bookModels from "../models/bookModel.js";
import { nanoid } from "nanoid";

const getAllBooksServices = async (params, callback) => {
  try {
    const { page, limit, skip, query } = params;

    let books = await bookModels
      .find(query)
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await bookModels.count();

    return callback(false, {
      success: true,
      books,
      page: Number(page),
      pages: Math.ceil(totalCount / limit),
      limit: Number(limit),
      totalCount,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

const createBookService = async (params, callback) => {
  try {
    const {
      name,
      description,
      price,
      rating,
      images_urls,
      category,
      stock,
      id,
    } = params;

    const bookImage = images_urls?.map((url) => {
      return {
        public_id: nanoid(),
        url: url,
      };
    });

    const book = new bookModels({
      name,
      description,
      price,
      rating,
      images: [...(bookImage || [])],
      category,
      stock,
      created_by: id,
    });

    await book.save();

    return {
      success: true,
      book,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message,
    };
  }
};

const deleteBookService = async (params, callback) => {
  try {
    const { id } = params;

    await bookModels.deleteOne({ _id: id });

    return callback(false, {
      success: true,
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

const updateBookService = async (params, callback) => {
  try {
    const { filter, updateQuery } = params;
    const book = await bookModels.findOneAndUpdate(filter, updateQuery, {
      new: true, // Return the modified document
      runValidators: true, // Run validators for update operation
    });
    return callback(false, {
      success: true,
      book,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

const isBookExist = async (params) => {
  try {
    const { id } = params;

    const book = await bookModels.findById(id);

    if (!book) {
      return {
        success: false,
        message: "No Book Found",
      };
    } else {
      return {
        success: true,
        book,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message,
    };
  }
};

const isBookYours = (params) => {
  try {
    const { userId, bookDetails } = params;

    if (userId?.toString() === bookDetails?.created_by?.toString()) {
      return {
        success: true,
        message: "This is your book",
      };
    } else {
      return {
        success: false,
        message: "You are not the owner of this book",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message,
    };
  }
};

export {
  getAllBooksServices,
  createBookService,
  updateBookService,
  deleteBookService,
  isBookExist,
  isBookYours,
};
