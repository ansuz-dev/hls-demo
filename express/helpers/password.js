import util from "util";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const bcryptHash = util.promisify(bcrypt.hash);
const bcryptCompare = util.promisify(bcrypt.compare);

const randomPasswordLength = 9;
const saltLength = 10;

/**
 * Generate a random password with default length
 */
const random = () => crypto.randomBytes(randomPasswordLength)
  .toString("base64");

/**
 * Hash a password using bcrypt
 *
 * @param {String} password
 */
const hash = password => bcryptHash(password, saltLength);

/**
 * Verify a password with its hash
 *
 * @param {String} password
 * @param {String} passwordHash
 */
const verify = (password, passwordHash) => bcryptCompare(password, passwordHash);

/**
 * Verify the format of a password
 *
 * @param {String} password
 */
const isValidPassword = password => {
  if (!password) {
    return false;
  }

  // eslint-disable-next-line no-magic-numbers
  if (password.length < 4) {
    return false;
  }

  if (!password.match(/[A-Z]/giu)) {
    return false;
  }

  if (!password.match(/\d/giu)) {
    return false;
  }

  return true;
};

const passwordHelper = {
  random,
  hash,
  verify,
  isValidPassword,
};

export default passwordHelper;
