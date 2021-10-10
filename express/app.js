/* eslint no-unused-vars: ["error", { "args": "none" }]*/

import path from "path";
import httpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import {requestLogger, errorLogger} from "@ansuzdev/logger";

import secrets from "../secrets.js";
import indexRouter from "./routes/index.js";

// eslint-disable-next-line no-shadow
const __dirname = path.resolve();

const app = express();
app.use(helmet({contentSecurityPolicy: false}));
app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(secrets.cookie));
app.use(express.static(path.join(__dirname, "../webapp")));

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
