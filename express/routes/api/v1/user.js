
import express from "express";

import {
  logger,
  userService,
} from "../../../services";

import authMid from "../../../mws/auth";

const router = express.Router();

router.use(authMid.requireUser);

router.get("/", async (req, res, next) => {
  logger.info("Get information of logged user=[%s]", req.user.id);

  try {
    res.json(req.user);
  } catch(error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  logger.info("Update information of logged user=[%s]", req.user.id);

  try {
    const user = await userService.update(req.user.id, req.body);

    res.json(user);
  } catch(error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  logger.info("Delete logged user=[%s]", req.user.id);

  try {
    await userService.block(req.user.id);
    res.end();
  } catch(error) {
    next(error);
  }
});

router.put("/password", async (req, res, next) => {
  logger.info("Change password of logged user=[%s]", req.user.id);

  try {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);

    res.end();
  } catch(error) {
    next(error);
  }
});

export default router;
