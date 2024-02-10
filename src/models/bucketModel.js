import mongoose from "mongoose";
import { modelsName } from "../utils/constants.js";

const bucketSchema = new mongoose.Schema(
  {
    saveMe: [
      {
        type: mongoose.Schema.ObjectId,
        ref: modelsName.BOOKS,
      }
    ],
    card: [
      {
        book: {
          type: mongoose.Schema.ObjectId,
          ref: modelsName.BOOKS,
        },
        qlt: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { _id: false }
);

export default bucketSchema;
