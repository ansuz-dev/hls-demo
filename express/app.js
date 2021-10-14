/* eslint no-unused-vars: ["error", { "args": "none" }]*/

import httpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import {requestLogger, errorLogger} from "@ansuzdev/logger";

import secrets from "../secrets.js";
import configs from "../configs.js";
import indexRouter from "./routes/index.js";

const app = express();
app.use(helmet({contentSecurityPolicy: false}));
app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(secrets.cookie));
app.use(express.static(configs.dirs.static));

app.use(requestLogger);

app.use("/", indexRouter);

app.use(errorLogger);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpError.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-magic-numbers
  res.status(err.status || 500);
  res.json({message: err.message});
});

export default app;
