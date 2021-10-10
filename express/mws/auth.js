import httpError from "http-errors";

import {jwtHelper} from "../helpers/index.js";
import {userService} from "../services/index.js";

import {UserStates} from "../services/constant.js";

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

  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  if (req.signedCookies && req.signedCookies.token) {
    return req.signedCookies.token;
  }

  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
};

const verifyUserToken = async (req, verificationFunc) => {
  const token = getToken(req);
  if (!token) throw httpError.Unauthorized("Invalid token");
  const decoded = jwtHelper[verificationFunc](token);
  if (!decoded) throw httpError.Unauthorized("Invalid token");
  if (!decoded.id || !decoded.checksum) {
    throw httpError.Unauthorized("Invalid token");
  }
  const user = await userService.get(decoded.id);
  if (decoded.checksum !== jwtHelper.computeChecksum.verifyAuthToken(user)) {
    throw httpError.Unauthorized("Invalid token");
  }
  if (user.state !== UserStates.enabled) {
    throw httpError.Forbidden("You don't have permission to access this action");
  }

  // eslint-disable-next-line require-atomic-updates
  req.user = user;
};

const requireUser = (req, res, next) => {
  verifyUserToken(req, "verifyUserToken")
    .then(() => {
      res.locals = res.locals || {};
      res.locals.user = req.user;
      next();
    })
    .catch(() => {
      next(httpError.Unauthorized("Invalid token"));
    });
};

const authMid = {requireUser};

export default authMid;
