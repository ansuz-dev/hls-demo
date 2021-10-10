import express from "express";

import {expressHandler} from "../../../helpers/express.js";

import {userService} from "../../../services/index.js";

import {jwtHelper} from "../../../helpers/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 */

router.post("/login", expressHandler(async (req, res) => {
  const user = await userService.authenticate(req.body);
  const token = jwtHelper.computeUserToken(user, true);

  res.json({token, user});
}));

export default router;
