import { Router } from "express";

import {
    onlyaccessBy,
    isAuthenticated,
    isAccessable,
  } from "../../middleware/authMiddleware.js";
import { userType } from "../../utils/constants.js";
const authorRoutes = Router();


const hideBook = () => {}

export default authorRoutes;
