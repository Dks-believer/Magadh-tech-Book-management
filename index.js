import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
dotenv.config();
const server = express();

import router from "./src/routes/index.js";

import DBConnection from './src/config/DBConfig.js'
process.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});
DBConnection();

server.use(express.json())
server.use(cookieParser());
server.use("/api", router);
server.use(errorHandler)

server.listen(process.env.PORT, () => {
  console.log("... Server is started ...");
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
