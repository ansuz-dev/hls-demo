import express from "express";

import apiRouter from "./api/index.js";
import docsRouter from "./docs/index.js";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/docs", docsRouter);

export default router;
