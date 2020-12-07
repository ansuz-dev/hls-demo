/*eslint no-unused-vars: ["error", { "args": "none" }]*/

import fs from "fs";
import path from "path";
import httpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import morgan from "morgan";
const rfs = require("rotating-file-stream");

import {
  logger,
} from "./services";

import indexRouter from "./routes/index";

import { cookie } from "../secrets";

const app = express();
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.disable("x-powered-by");
app.use(cors());

//  setup loggers
const logDirectory = path.join(__dirname, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Configure http access logs
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  maxFiles: 15,
  path: logDirectory,
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookie.secret));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(httpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

export default app;
