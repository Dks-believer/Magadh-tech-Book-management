import express from "express";
import bookRoutes from './v1/bookRoutes.js'
import authRoutes from "./v1/authRoutes.js";
import reviewRoutes from "./v1/reviewRoutes.js";
import authorRoutes from "./v1/authorRoutes.js";
import userRoutes from "./v1/userRoutes.js";
const routes = express.Router()

routes.use("/v1" ,bookRoutes)
routes.use("/v1" ,authRoutes)
routes.use("/v1" ,reviewRoutes)
routes.use("/v1" ,authorRoutes)
routes.use("/v1", userRoutes);

export default routes