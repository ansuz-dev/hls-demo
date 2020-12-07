"use strict";

import util from "util";
import crypto from "crypto";
import bcrypt from "bcrypt";

const bcrypt_hash = util.promisify(bcrypt.hash);
const bcrypt_compare = util.promisify(bcrypt.compare);
const pbkdf2 = util.promisify(crypto.pbkdf2);

const saltRounds = 10;
const iterations = 100000;
const keylen = 64;
const randomPasswordLength = 9;

/**
 * Generate a random password with default length
 */
function random() {
  return crypto.randomBytes(randomPasswordLength)
    .toString("base64");
}

/**
 * Hash a password using bcrypt
 *
 * @param {String} password
 */
async function hash(password) {
  return await bcrypt_hash(password, saltRounds);
}

/**
 * Verify a password with its hash
 *
 * @param {String} password
 * @param {String} hash
 */
async function verify(password, hash) {
  return await bcrypt_compare(password, hash);
}

/**
 * Verify the format of a password
 *
 * @param {String} password
 */
function isValidPassword(password) {
  if (!password) {
    return false;
  }

  if (password.length < 4) {
    return false;
  }

  if (!password.match(/[A-Z]/gi)) {
    return false;
  }

  if (!password.match(/\d/gi)) {
    return false;
  }

  return true;
}

/**
 * Derive user password
 */
async function derive(password, salt) {
  // compute sha256(sha256(password))
  let sha256 = crypto.createHash("sha256");
  sha256.update(password);
  let buff = sha256.digest();

  sha256 = crypto.createHash("sha256");
  sha256.update(buff);
  buff = sha256.digest();

  // compute pbkdf2
  let derivedKey = await pbkdf2(password, salt, iterations, keylen, "sha512");
  let key = Buffer.alloc(32);
  derivedKey.copy(key, 0, 0, 32);

  return key;
}

export default {
  random,
  hash,
  verify,
  isValidPassword,
  derive,
};
