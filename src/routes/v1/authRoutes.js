import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotpassword,
  resetPassword,
} from "../../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/forgetpassword", forgotpassword);
authRoutes.put("/resetPassword", resetPassword);

export default authRoutes;
