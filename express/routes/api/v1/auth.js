import express from "express";

import {
  logger,
  userService,
  // mailService
} from "../../../services";

import {
  jwtHelper, utilHelper,
} from "../../../helpers";

import confirmationMid from "../../../mws/confirmation";
import resetMid from "../../../mws/reset_password";

import { UserTypes } from "../../../services/constant";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  logger.info("Register new account to the system as the user");

  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      type: req.body.type || UserTypes.person,
      defaultLanguage: req.body.defaultLanguage,
    };

    const user = await userService.create(data);

    // await mailService.sendUserConfirmationEmail(user);

    res.json(user);
  } catch(error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  logger.info("Login to the system as the user");

  try {
    const user = await userService.authenticate(req.body);
    const token = jwtHelper.computeUserToken(user, true);

    res.json({ token, user });
  } catch(error) {
    next(error);
  }
});

router.put("/password", async (req, res, next) => {
  logger.info("Request to reset password");

  try {
    const { email } = req.body;

    // send reset password email to the target
    const trimmedEmail = utilHelper.normEmail(email);
    const user = await userService.getByEmail(trimmedEmail, null);
    if (user) {
      // await mailService.sendUserResetPassword(user);
    }

    res.end();
  } catch(error) {
    next(error);
  }
});

router.put("/password/reset",
  resetMid.requireReset,
  async (req, res, next) => {
    logger.info("Reset password by user=[%s]", req.user.id);

    try {
      const { password } = req.body;

      await userService.resetPassword(req.user.id, password);

      res.end();
    } catch(error) {
      next(error);
    }
  });

router.get("/activation",
  confirmationMid.requireConfirmation,
  async (req, res, next) => {
    logger.info("Activate the account=[%s]", req.user.id);

    try {
      await userService.enable(req.user.id);

      // redirect to login page
      res.redirect(301, "/");
    } catch(error) {
      next(error);
    }
  });

export default router;
