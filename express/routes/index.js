import express from "express";

import apiRouter from "./api";
import docsRouter from "./docs";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/docs", docsRouter);

export default router;
