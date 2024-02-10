import userModel from "../models/userModel.js";
import { nanoid } from "nanoid";
import Tokens from "../utils/token.js";
import Email from "../utils/email.js";
import Encryption from "../utils/encrypt.js";
import { updateUser } from "./userService.js";

const createNewUserService = async (params) => {
  try {
    const { image_base64, name, email, password } = params;

    const user = new userModel({
      name,
      avatar: {
        public_id: nanoid(),
        url: image_base64,
      },
      email,
      password,
    });

    await user.save();
    const token = new Tokens();
    return token.sendToken(user);
  } catch (err) {
    return {
      success: false,
      message: err?.message,
    };
  }
};

const userLoginService = async (params, callback) => {
  try {
    const { email, password, userDetails } = params;

    const passwordValid = await userDetails.isCorrectPassword(password);

    if (passwordValid) {
      const token = new Tokens();
      return callback(false, token.sendToken(userDetails));
    } else {
      return callback({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    return callback({
      success: false,
      message: err?.message,
    });
  }
};

const userForgotPasswordService = async (params, callback) => {
  const { email, userDetails, protocol, host } = params;
  try {
    const resetTokens = userDetails.getResetToken();

    await userDetails.save({ validateBeforeSave: false });

    const resetPasswordURL = `${protocol}://${host}/resetPassword?email=${email}&token=${resetTokens}`;

    const resetPasswordMessage = `Hii There \n This mail to Reseting your password Click the link below \n\nLink:${resetPasswordURL} \n\nThanks for using your services`;

    const emailServices = new Email(
      email,
      "Reset password",
      resetPasswordMessage
    );

    await emailServices.sendMail();

    return callback(false, {
      success: true,
      message: `Message was send to this Email: ${email}`,
    });
  } catch (error) {
    userDetails.resetPasswordToken = undefined;
    userDetails.resetPasswordExpire = undefined;

    await userDetails.save({ validateBeforeSave: false });

    return callback({
      success: false,
      message: error?.message,
    });
  }
};

const userResetPasswordService = async (params, callback) => {
  try {
    const { email, resetToken, newPassword, userDetails } = params;

    const token = new Tokens();
    const resetPasswordToken = token.genrateHashToken(resetToken);

    const isSimillarPassword = await userDetails.isCorrectPassword(newPassword);

    if (!isSimillarPassword) {
      const hashing = new Encryption();
      const hashedNewPassword = await hashing.encrypt(newPassword);
      await updateUser(
        { email, resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } },
        {
          password: hashedNewPassword,
          resetPasswordToken: null,
          resetPasswordExpire: null,
        },
        (err, result) => {
          if (err) {
            callback({
              success: false,
              message: "Reset Password Token is invalid or expired",
            });
          } else {
            callback(false, result);
          }
        }
      );
    } else {
      callback({
        success: false,
        message: "New Password can not be the same as old one",
      });
    }
  } catch (error) {
    callback({
      success: false,
      message: error?.message,
    });
  }
};

export {
  userLoginService,
  createNewUserService,
  userResetPasswordService,
  userForgotPasswordService,
};
