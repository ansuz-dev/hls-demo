import express from "express";

import {
  expressHandler,
} from "../../../helpers/express";

import {
  userService,
} from "../../../services";

import {
  jwtHelper, utilHelper,
} from "../../../helpers";

import confirmationMid from "../../../mws/confirmation";
import resetMid from "../../../mws/reset_password";
import { UserTypes } from "../../../services/constant";

import authValidators from "./validators/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register a new user
 *     operationId: registerUser
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterData'
 *     responses:
 *       200:
 *         description: User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.post("/register",
  authValidators.registerValidator,
  expressHandler(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
      type: req.body.type || UserTypes.person,
      defaultLanguage: req.body.defaultLanguage,
    };

    const user = await userService.create(data);

    // await mailService.sendUserConfirmationEmail(user);

    res.json(user);
  }));

router.post("/login", expressHandler(async (req, res) => {
  const user = await userService.authenticate(req.body);
  const token = jwtHelper.computeUserToken(user, true);

  res.json({ token, user });
}));

router.put("/password", expressHandler(async (req, res) => {
  const { email } = req.body;

  // send reset password email to the target
  const trimmedEmail = utilHelper.normEmail(email);
  const user = await userService.getByEmail(trimmedEmail, null);
  if (user) {
    // await mailService.sendUserResetPassword(user);
  }

  res.end();
}));

router.put("/password/reset",
  resetMid.requireReset,
  expressHandler(async (req, res) => {
    const { password } = req.body;

    await userService.resetPassword(req.user.id, password);
    res.end();
  }));

router.get("/activation",
  confirmationMid.requireConfirmation,
  expressHandler(async (req, res) => {
    await userService.enable(req.user.id);
    // redirect to login page
    res.redirect(301, "/");
  }));

export default router;
