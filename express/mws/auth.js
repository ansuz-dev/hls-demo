const httpError = require("http-errors");

const {jwtHelper} = require("../helpers");
const {
  logger,
  userService,
} = require("../services");

const {
  UserStates,
} = require("../services/constant");

/**
 * Get token from request
 *
 * @param {Request} req
 */
function getToken(req) {
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
}

async function verifyUserToken(req, verificationFunc) {
  var token = getToken(req);
  if (!token)
    throw httpError(401, "Invalid token");
  var decoded = jwtHelper[verificationFunc](token);
  if (!decoded)
    throw httpError(401, "Invalid token");
  if (!decoded.id || !decoded.checksum) {
    throw httpError(401, "Invalid token");
  }
  const user = await userService.get(decoded.id);
  if (decoded.checksum !== jwtHelper.computeChecksum.verifyAuthToken(user)) {
    throw httpError(401, "Invalid token");
  }
  if (user.state !== UserStates.enabled) {
    throw httpError(403, "You don't have permission to access this action");
  }
  req.user = user;
}

function requireUser(req, res, next) {
  verifyUserToken(req, "verifyUserToken")
    .then(() => {
      res.locals = res.locals || {};
      res.locals.user = req.user;
      next();
    })
    .catch((error) => {
      logger.error(error);
      next(httpError(401, "Invalid token"));
    });
}

export default {
  requireUser,
};
