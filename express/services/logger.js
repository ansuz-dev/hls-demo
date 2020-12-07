/* eslint-disable no-unused-vars */

import fs from "fs";
import path from "path";
import logger from "winston";
require("winston-daily-rotate-file");

//  setup loggers
const logDirectory = path.join(__dirname, "../../logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Configure debug log
const logFilter = logger.format((info, opts) => info);

const logFormat = logger.format.printf(info => {
  let message = `${info.timestamp} - [${info.level.toUpperCase()}] : ${info.message}`;
  if (info.stack) {
    message += "\n  " + info.stack;
  }

  return message;
});

const transport = new (logger.transports.DailyRotateFile)({
  dirname: logDirectory,
  filename: "log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "15d",
  json: false,
  level: "debug",
});

logger.configure({
  format: logger.format.combine(
    logFilter(),
    logger.format.splat(),
    logger.format.timestamp(),
    logFormat,
  ),
  transports: [ transport ],
  exitOnError: false,
});

export default logger;
