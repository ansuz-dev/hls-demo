import express from "express";

import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({"message": "OK"});
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
