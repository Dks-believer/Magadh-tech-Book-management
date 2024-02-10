import { Router } from "express";

import {
    onlyaccessBy,
    isAuthenticated,
    isAccessable,
  } from "../../middleware/authMiddleware.js";
import { userType } from "../../utils/constants.js";
const adminRoutes = Router();


const hideBook = () => {}

export default adminRoutes;
