import express from "express";

import {expressHandler} from "../../../helpers/express.js";

import authMid from "../../../mws/auth.js";

const router = express.Router();

router.use(authMid.requireUser);

router.get("/", expressHandler((req, res) => {
  res.json(req.user);
}));

export default router;
