import express from "express";
import multer from "multer";

import {expressHandler} from "../../../helpers/express.js";

import {mediaService, encoder} from "../../../services/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media
 */

const mediaUpload = multer({storage: mediaService.mediaStorage});

/**
  * @swagger
  * /media:
  *   post:
  *     summary: Upload media to streaming
  *     description: Upload media to streaming
  *     tags:
  *       - Media
  *     requestBody:
  *       content:
  *         multipart/form-data:
  *           schema:
  *             $ref: '#/components/schemas/UploadMedia'
  *     responses:
  *       200:
  *         description: Media is uploaded successfully
  *
  * components:
  *   schemas:
  *     UploadMedia:
  *       type: object
  *       required:
  *         - file
  *       properties:
  *         file:
  *           type: string
  *           format: binary
  *           description: Media file to streaming
  */
router.post(
  "/",
  mediaUpload.single("file"),
  expressHandler(async (req, res) => {
    // upload media file
    await encoder.encodeHLS(req.file.path);

    res.end();
  }),
);

/**
  * @swagger
  * /media/list:
  *   get:
  *     summary: List all streaming media
  *     description: List all streaming media
  *     tags:
  *       - Media
  *     responses:
  *       200:
  *         description: List of streaming medias
  *         content:
  *           application/json:
  *             schema:
  *                 $ref: '#/components/schemas/MediaList'
  *
  * components:
  *   schemas:
  *     MediaList:
  *       type: array
  *       items:
  *         type: object
  *         required:
  *           - media
  *         properties:
  *           media:
  *             type: string
  *             description: Link to media *.m3u8
  *           thumbnail:
  *             type: string
  *             description: Link to thumbnail *.jpg
  */
router.get(
  "/list",
  expressHandler(async (req, res) => {
    // list all streaming media
    const list = await mediaService.listMedias();

    res.json(list);
  }),
);

export default router;
