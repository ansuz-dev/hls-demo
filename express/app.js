/*eslint no-unused-vars: ["error", { "args": "none" }]*/

import path from "path";
import httpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";

import indexRouter from "./routes/index";

import { cookie } from "../secrets";

const app = express();
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookie.secret));
app.use(express.static(path.join(__dirname, "../webapp")));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  metaField: null,
  requestWhitelist: [
    "hostname",
    "ip",
    "url",
    "headers",
    "method",
    "httpVersion",
    "originalUrl",
    "query",
    "body",
  ],
  bodyBlacklist: [ "password" ],
  colorize: false,
  ignoreRoute: function (req, res) {
    if (req.url.match(/^\/docs\/.*/g)) {
      return true;
    }

    return false;
  },
}));

app.use("/", indexRouter);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.json(),
  ),
  metaField: null,
  blacklistedMetaFields: ["exception"],
  requestWhitelist: [
    "hostname",
    "ip",
    "url",
    "headers",
    "method",
    "httpVersion",
    "originalUrl",
    "query",
    "body",
  ],
  bodyBlacklist: [ "password" ],
  colorize: false,
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(httpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

export default app;
