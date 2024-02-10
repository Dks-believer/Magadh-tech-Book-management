import { Router } from "express";
import {
    onlyaccessBy,
    isAuthenticated,
    isAccessable,
  } from "../../middleware/authMiddleware.js";
import {
  addToBucket,
  addaddress,
  deleteUserArrData,
  updateAddress,
  changePassword,
  updateUserProfile,
  assignUserRole,
} from "../../controller/userController.js";
import { userType } from "../../utils/constants.js";

const userRoutes = Router();

userRoutes.post(
  "/assignUserRole",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER]),
  isAccessable,
  assignUserRole
);

userRoutes.post(
  "/addToBucket",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  addToBucket
);

userRoutes.post(
  "/addaddress",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  addaddress
);

userRoutes.patch(
  "/updateAddress",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  updateAddress
);

userRoutes.delete(
  "/deleteUserArrData",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  deleteUserArrData
);

userRoutes.post(
  "/updateUserProfile",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  updateUserProfile
);

userRoutes.post(
  "/changePassword",
  isAuthenticated,
  onlyaccessBy.bind([userType.USER, userType.AUTHORS, userType.ADMIN]),
  isAccessable,
  changePassword
);

export default userRoutes;
