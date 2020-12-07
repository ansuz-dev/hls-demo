
import express from "express";

import {
  expressHandler,
} from "../../../helpers/express";

import {
  logger,
  userService,
} from "../../../services";

import authMid from "../../../mws/auth";

const router = express.Router();

router.use(authMid.requireUser);

router.get("/", expressHandler(async (req, res) => {
  logger.info("Get information of logged user=[%s]", req.user.id);
  res.json(req.user);
}));

router.put("/", expressHandler(async (req, res) => {
  logger.info("Update information of logged user=[%s]", req.user.id);
  const user = await userService.update(req.user.id, req.body);
  res.json(user);
}));

router.delete("/", expressHandler(async (req, res) => {
  logger.info("Delete logged user=[%s]", req.user.id);

  await userService.block(req.user.id);
  res.end();
}));

router.put("/password", expressHandler(async (req, res) => {
  logger.info("Change password of logged user=[%s]", req.user.id);

  const { oldPassword, newPassword } = req.body;
  await userService.changePassword(req.user.id, oldPassword, newPassword);
  res.end();
}));

export default router;
