import mongoose from "mongoose";
import { modelsName } from "../utils/constants.js";

const authorSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: modelsName.AUTHORS,
      unique: true,
      required: true,
    },
    totalbook: {
      type: Number,
      default: 0,
    },
    totalStock: {
      type: Number,
      required: [true, "Please specify Number of books you can store"],
    },
    usedStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    totalbanned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true , _id:false}
);

export default mongoose.model(modelsName.AUTHORS, authorSchema);
