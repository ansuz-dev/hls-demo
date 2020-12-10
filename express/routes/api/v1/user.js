import express from "express";

import {
  expressHandler,
} from "../../../helpers/express";

import {
  userService,
} from "../../../services";

import authMid from "../../../mws/auth";

const router = express.Router();

router.use(authMid.requireUser);

router.get("/", expressHandler(async (req, res) => {
  res.json(req.user);
}));

router.put("/", expressHandler(async (req, res) => {
  const user = await userService.update(req.user.id, req.body);
  res.json(user);
}));

router.delete("/", expressHandler(async (req, res) => {

  await userService.block(req.user.id);
  res.end();
}));

router.put("/password", expressHandler(async (req, res) => {

  const {oldPassword, newPassword} = req.body;
  await userService.changePassword(req.user.id, oldPassword, newPassword);
  res.end();
}));

export default router;
