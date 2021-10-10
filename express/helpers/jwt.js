import crypto from "crypto";
import jwt from "jsonwebtoken";

import secrets from "../../secrets.js";

const config = secrets.jwt;

const issuer = "template";

const subjects = {
  access: "access",
  confirmation: "confirmation",
  reset: "reset",
};

const audiences = {user: "user"};

const checksumLength = 4;

const _computeChecksum = (account, subject) => {
  const sha256 = crypto.createHash("SHA256");
  const hash = sha256.update(account.passwordHash).update(subject)
    .digest("hex");

  return hash.substr(0, checksumLength);
};

const computeChecksum = {
  verifyAuthToken: account => _computeChecksum(account, subjects.access),
  verifyResetToken: account => _computeChecksum(account, subjects.reset),
};

/**
 * Compute access token for the user
 *
 * @param {Object} user
 * @param {number} user.id
 * @param {boolean} permanent
 *
 * @returns {string} access token
 */
const computeUserToken = (user, permanent = false) => {
  const opts = {
    issuer,
    audience: audiences.user,
    subject: subjects.access,
  };

  if (!permanent) {
    opts.expiresIn = "1d";
  }

  return jwt.sign(
    {
      id: user.id,
      checksum: _computeChecksum(user, subjects.access),
    },
    config.user,
    opts,
  );
};

/**
 * Compute confirmation token for the user
 *
 * @param {Object} user
 * @param {number} user.id
 * @param {boolean} permanent
 *
 * @returns {string} confirmation token
 */
const computeConfirmationToken = user => {
  const opts = {
    issuer,
    audience: audiences.user,
    subject: subjects.confirmation,
    expiresIn: "7d",
  };

  return jwt.sign(
    {id: user.id},
    config.confirmation,
    opts,
  );
};

/**
 * Compute reset password token for the user
 *
 * @param {Object} user
 * @param {number} user.id
 *
 * @returns {string} reset password token
 */
const computeResetToken = user => {
  const opts = {
    issuer,
    audience: audiences.user,
    subject: subjects.reset,
    expiresIn: "30m",
  };

  return jwt.sign(
    {
      id: user.id,
      checksum: _computeChecksum(user, subjects.reset),
    },
    config.reset,
    opts,
  );
};

/**
 * Verify access token of the user
 *
 * @param { String } token
 *
 * @returns { Object } payload data
 *
 * @throws { Error } Invalid token
 */
const verifyUserToken = token => jwt.verify(token, config.user, {
  issuer,
  audience: audiences.user,
  subject: subjects.access,
});

/**
 * Verify confirmation token of the user
 *
 * @param { String } token
 *
 * @returns { Object } payload data
 *
 * @throws { Error } Invalid token
 */
const verifyConfirmationToken = token => jwt.verify(token, config.confirmation, {
  issuer,
  audience: audiences.user,
  subject: subjects.confirmation,
});

/**
 * Verify reset password token of the user
 *
 * @param { String } token
 *
 * @returns { Object } payload data
 *
 * @throws { Error } Invalid token
 */
const verifyResetToken = token => jwt.verify(token, config.reset, {
  issuer,
  audience: audiences.user,
  subject: subjects.reset,
});

const jwtHelper = {
  computeChecksum,
  computeUserToken,
  verifyUserToken,
  computeConfirmationToken,
  verifyConfirmationToken,
  computeResetToken,
  verifyResetToken,
};

export default jwtHelper;
