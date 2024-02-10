import mongoose from "mongoose";
import { modelsName, userType } from "../utils/constants.js";
import validator from "validator";
import imageSchema from "./imageModel.js";
import Encryption from "../utils/encrypt.js";
import Tokens from "../utils/token.js";
import addressSchema from "./addressModel.js";
import bucketSchema from "./bucketModel.js";


const adminSchema = new mongoose.Schema({
  avatar: imageSchema,
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  role: {
    type: String,
    default: userType.ADMIN,
  },
  address: [addressSchema],
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email id"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [8, "Your password should be between 8 - 16 character"],
    maxLength: [16, "Your password should be between 8 - 16 character"],
  },
  bucket: bucketSchema,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

adminSchema.pre("save", async function (next) {
  const hashing = new Encryption();
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await hashing.encrypt(this.password);
  }
});

adminSchema.methods.getJwtToken = function () {
  const token = new Tokens();
  return token.genrateToken({
    id: this._id,
  });
};

adminSchema.methods.isCorrectPassword = function (password) {
  const hashing = new Encryption();
  return hashing.validation(password, this.password);
};

adminSchema.methods.getResetToken = function () {
  const token = new Tokens();
  const user = this;
  return token.genrateResendToken(user);
};

export default mongoose.model(modelsName.ADMIN, adminSchema);
