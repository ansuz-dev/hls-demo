import {validationResult} from "express-validator";
import httpError from "http-errors";

export const expressHandler = fn => async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw httpError.BadRequest(errors.array()[0].msg, {errors});
    }

    await fn(req, res);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

const expressHelper = {expressHandler};

export default expressHelper;
