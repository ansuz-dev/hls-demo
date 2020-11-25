const httpError = require("http-errors");

const { jwtHelper } = require("../helpers");
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

async function verifyConfirmationToken(req) {
  var token = getToken(req);
  console.log(token);
  if (!token)
    throw httpError(401, "Invalid token");
  var decoded = jwtHelper.verifyConfirmationToken(token);
  if (!decoded)
    throw httpError(401, "Invalid token");
  if (!decoded.id) {
    throw httpError(401, "Invalid token");
  }
  const user = await userService.get(decoded.id);
  if (user.state !== UserStates.created) {
    throw httpError(403, "Permission denied");
  }
  req.user = user;
}

function requireConfirmation(req, res, next) {
  verifyConfirmationToken(req)
    .then(next)
    .catch((error) => {
      logger.error(error);
      next(httpError(401, "Invalid token"));
    });
}

export default {
  requireConfirmation,
};
