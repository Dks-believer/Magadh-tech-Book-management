import httpStatus from "http-status";
import ErrorHandles from "../utils/error.js";
import Tokens from "../utils/token.js";
import { findUserByID } from "../services/userService.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandles(
          "Please Login to Access this resource",
          httpStatus.BAD_REQUEST
        )
      );
    } else {
      const jwt = new Tokens();
      const data = jwt.verifyToken(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (data.exp < currentTimestamp) {
        console.log("Token has expired");
        return next(
          new ErrorHandles(
            "Please Login Again to Access this resources",
            httpStatus.BAD_REQUEST
          )
        );
      } else {
        console.log("Token is valid");
        const userData = await findUserByID({ _id: data?.id });
        if (userData?.success) {
          req.user = userData?.user;
          return next();
        } else {
          console.log("User Did Not Exist");
          res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
          return next(
            new ErrorHandles(
              "User Did Not Exist, Please Login Again to Access this resource",
              httpStatus.BAD_REQUEST
            )
          );
        }
      }
    }
  } catch (err) {
    return next(new ErrorHandles(err?.message, 400));
  }
};

function onlyaccessBy(req, res, next) {
  req.userTypeAllowed = this;
  next();
}

const isAccessable = (req, res, next) => {
  try {
    const userType = req?.userTypeAllowed;
    const user = req?.user;
    console.log(userType , user)
    if (userType?.includes(user?.role)) {
      next();
    } else {
      return next(
        new ErrorHandles(
          "Not enough permision to access this resource",
          httpStatus.BAD_REQUEST
        )
      );
    }
  } catch (err) {
    return next(new ErrorHandles(err?.message, 400));
  }
};

export { onlyaccessBy, isAuthenticated, isAccessable };
