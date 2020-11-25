import logger from "winston";
import httpError from "http-errors";

import db from "../models";
const {
  sequelize,
  Sequelize,
  User,
} = db;
const Op = Sequelize.Op;

import {
  UserTypes,
  UserStates,
} from "./constant";

import {
  passwordHelper,
  utilHelper,
} from "../helpers";

/**
 * Create new user
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.type
 * @param {string} data.defaultLanguage
 */
async function create(data={}, t) {
  if (!data.email) throw httpError(400, "Email can't be empty");
  if (!data.password) throw httpError(400, "Password can't be empty");

  logger.debug("Create new user with email=[%s]", data.email);

  const trimmedEmail = utilHelper.normEmail(data.email);
  const passwordHash = await passwordHelper.hash(data.password);

  let user = await getByEmail(trimmedEmail, null);
  if (user) {
    throw httpError(409, `Email=[${trimmedEmail}] is already used`);
  }

  user = await User.create({
    email: trimmedEmail,
    passwordHash,
    type: data.type || UserTypes.person,
    defaultLanguage: data.defaultLanguage,
  }, { transaction: t });

  return user;
}

/**
 * Get user by ID
 *
 * @param {number} id
 * @param {number} errorCode
 */
async function get(id, errorCode=404) {
  logger.debug("Get user by id=[%s]", id);

  const user = await User.findByPk(id);
  if (!user && errorCode) {
    throw httpError(errorCode, `User=[${id}] not found`);
  }

  return user;
}

/**
 * Get user by email
 *
 * @param {string} email
 * @param {number} errorCode
 *
 */
async function getByEmail(email, errorCode=404) {
  logger.debug("Get user by email=[%s]", email);

  let user = await User.findOne({
    where: { email },
  });
  if (!user && errorCode) {
    throw httpError(errorCode, `User=[${email}] not found`);
  }

  return user;
}

/**
 * Update a user
 *
 * @param {number} id
 * @param {object} data
 * @param {object} data.defaultLanguage
 */
async function update(id, data) {
  logger.debug("update user=[%s]", id);

  return sequelize.transaction(async (t) => {
    let user = await get(id);

    if (data.defaultLanguage !== undefined) {
      user.defaultLanguage = data.defaultLanguage;
    }

    user = await user.save({ transaction: t });

    return user;
  });
}

async function changePassword(id, oldPassword, newPassword) {
  logger.debug("Change password of user=[%s]", id);

  return sequelize.transaction(async (t) => {
    const user = await get(id);
    const matched = await passwordHelper.verify(oldPassword, user.passwordHash);
    if (!matched) throw httpError(401, "Invalid current password");

    const newHash = await passwordHelper.hash(newPassword);
    user.passwordHash = newHash;

    return user.save({ transaction: t });
  });
}

async function resetPassword(id, password) {
  logger.debug("Reset password of user=[%s]", id);

  if (!password) {
    throw httpError(400, "Password is missing");
  }

  return sequelize.transaction(async (t) => {
    const user = await get(id);

    const passwordHash = await passwordHelper.hash(password);
    user.passwordHash = passwordHash;

    return user.save({ transaction: t });
  });
}

/**
 * Enable a user
 *
 * @param {number} id
 */
async function enable(id) {
  logger.debug("Enable user=[%s]", id);

  return sequelize.transaction(async (t) => {
    let user = await get(id);

    user.state = UserStates.enabled;

    return user.save({ transaction: t });
  });
}

/**
 * Block a user
 *
 * @param {number} id
 */
async function block(id) {
  logger.debug("Block user=[%s]", id);

  return sequelize.transaction(async (t) => {
    const user = await get(id);

    user.state = UserStates.blocked;

    return user.save({ transaction: t });
  });
}

/**
 * Authenticate with email and password
 *
 * @param {Object}  data
 * @param {string}  data.email
 * @param {string}  data.password
 *
 * @throws { httpError.Unauthorized }
 */
async function authenticate({ email, password }) {
  if (!email) throw httpError(401, "Invalid email or password");
  if (!password) throw httpError(401, "Invalid email or password");

  logger.debug("Authenticate user with email=[%s] and password", email);

  const trimmedEmail = utilHelper.normEmail(email);

  const user = await getByEmail(trimmedEmail, null);
  if (!user) throw httpError(401, "Invalid email or password");

  if (user.state !== UserStates.enabled) {
    throw httpError(403, "User has not activated yet or is blocked");
  }

  const matched = await passwordHelper.verify(password, user.passwordHash);
  if (!matched) throw httpError(401, "Invalid email or password");

  return user;
}

/**
 * Search users with filter query
 *
 * @param {Object} query
 * @param {string} query.filter
 * @param {string|Array} query.type
 * @param {string|Array} query.state
 * @param {number} page
 * @param {number} limit
 * @param {boolean} latest
 */
async function search(query, page = 0, limit = 20, latest = true) {
  logger.debug("Search users with query=[%j]", query);

  let q = {};
  if (query.filter) {
    q.name = { [Op.like]: `%${query.filter}%` };
  }
  if (query.type) {
    if (Array.isArray(query.type)) {
      q.type = { [Op.in]: query.type };
    } else if (typeof query.type === "string") {
      q.type = query.type;
    }
  }
  if (query.state) {
    if (Array.isArray(query.state)) {
      q.state = { [Op.in]: query.state };
    } else if (typeof query.state === "string") {
      q.state = query.state;
    }
  }

  let order = [];
  if (latest) order.push([ "id", "DESC" ]);

  let result = await User.findAndCountAll({
    where: q,
    limit: limit,
    offset: page * limit,
    order: order,
  });

  return {
    page: page,
    limit: limit,
    totalPages: Math.ceil(result.count / limit),
    total: result.count,
    users: result.rows,
  };
}

export default {
  create,
  get,
  getByEmail,
  update,
  changePassword,
  resetPassword,
  enable,
  block,
  authenticate,
  search,
};
