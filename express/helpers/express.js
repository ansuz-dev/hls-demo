import {validationResult} from "express-validator";
import httpError from "http-errors";

export function expressHandler(fn) {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw httpError(400, {errors: errors.array()});
      }

      await fn(req, res);
    } catch(error) {
      next(error);
    }
  };
}

export default {
  expressHandler,
};
