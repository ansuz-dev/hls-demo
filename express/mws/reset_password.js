import httpError from "http-errors";

import {jwtHelper} from "../helpers/index.js";
import {userService} from "../services/index.js";

/**
 * Get token from request
 *
 * @param {Request} req
 */
const getToken = req => {
  if (req.headers.authorization
    && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  if (req.cookies.token) {
    return req.cookies.token;
  }

  if (req.signedCookies.token) {
    return req.signedCookies.token;
  }

  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
};

const verifyResetToken = async req => {
  const token = getToken(req);
  if (!token) throw httpError.Unauthorized("Invalid token");
  const decoded = jwtHelper.verifyResetToken(token);
  if (!decoded) throw httpError.Unauthorized("Invalid token");
  if (!decoded.id) {
    throw httpError.Unauthorized("Invalid token");
  }
  const user = await userService.get(decoded.id);
  if (decoded.checksum !== jwtHelper.computeChecksum.verifyResetToken(user)) {
    throw httpError.Unauthorized("Invalid token");
  }

  // eslint-disable-next-line require-atomic-updates
  req.user = user;
};

const requireReset = (req, res, next) => {
  verifyResetToken(req)
    .then(next)
    .catch(() => {
      next(httpError.Unauthorized("Invalid token"));
    });
};

const resetMid = {requireReset};

export default resetMid;
