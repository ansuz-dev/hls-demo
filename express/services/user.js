import httpError from "http-errors";

import db from "../models/index.js";

const {User} = db;

/**
 * Get user by ID
 *
 * @param {number} id
 * @param {number} errorCode
 */
const get = async (id, errorCode = 404) => {
  const user = await User.findByPk(id);
  if (!user && errorCode) {
    throw httpError(errorCode, `User=[${id}] not found`);
  }

  return user;
};

const userService = {get};

export default userService;
