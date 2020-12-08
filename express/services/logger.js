import fs from "fs";
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import expressWinston from "express-winston";

//  setup loggers
const logDirectory = path.join(__dirname, "../../logs");
const debugDirectory = path.join(logDirectory, "debug");
const requestDirectory = path.join(logDirectory, "request");
const errorDirectory = path.join(logDirectory, "error");

fs.existsSync(debugDirectory)
  || fs.mkdirSync(debugDirectory, { recursive: true });
fs.existsSync(requestDirectory)
  || fs.mkdirSync(requestDirectory, { recursive: true });
fs.existsSync(errorDirectory)
  || fs.mkdirSync(errorDirectory, { recursive: true });

const logFormat = winston.format.printf(info => {
  let message = `${info.timestamp} - [${info.level.toUpperCase()}] : ${info.message}`;
  if (info.stack) {
    message += "\n  " + info.stack;
  }

  return message;
});

export const debugLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new DailyRotateFile({
      dirname: debugDirectory,
      filename: "debug-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "15d",
      json: false,
      level: "debug",
    }),
  ],
  exitOnError: false,
});

export const requestLogger = expressWinston.logger({
  transports: [
    new DailyRotateFile({
      dirname: requestDirectory,
      filename: "request-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "15d",
      json: false,
    }),
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
  ignoreRoute: function (req) {
    if (req.url.match(/^\/docs\/.*/g)) {
      return true;
    }

    return false;
  },
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new DailyRotateFile({
      dirname: errorDirectory,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "15d",
      json: false,
    }),
  ],
  format: winston.format.combine(
    winston.format.prettyPrint(),
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
});

export default {
  debugLogger,
  requestLogger,
  errorLogger,
};
