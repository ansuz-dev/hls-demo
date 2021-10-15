import express from "express";

import mediaRouter from "./media.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({"message": "OK"});
});

router.use("/media", mediaRouter);

export default router;
