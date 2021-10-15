import fs from "fs";
import path from "path";
import util from "util";
import multer from "multer";
import rs from "randomstring";

import configs from "../../configs.js";

const nameLen = 8;

const readdir = util.promisify(fs.readdir);

fs.existsSync(configs.dirs.media) || fs.mkdirSync(configs.dirs.media, {recursive: true});

export const mediaStorage = multer.diskStorage({
  destination(req, file, cb) {
    file.tmp = rs.generate(nameLen);
    const outputPath = path.join(configs.dirs.media, file.tmp);
    fs.existsSync(outputPath) || fs.mkdirSync(outputPath, {recursive: true});

    cb(null, outputPath);
  },
  filename(req, file, cb) {
    cb(null, file.tmp + path.extname(file.originalname));
  },
});

const listMedias = async () => {
  const res = [];
  const files = await readdir(configs.dirs.media, {withFileTypes: true});

  files.forEach(file => {
    if (file.isDirectory()) {
      if (fs.existsSync(path.join(configs.dirs.media, file.name, `${file.name}.m3u8`))) {
        res.push({
          name: file.name,
          media: `${configs.links.base}/media/${file.name}/${file.name}.m3u8`,
          thumbnail: `${configs.links.base}/media/${file.name}/thumbnail.jpg`,
        });
      }
    }
  });

  return res;
};

const mediaService = {
  mediaStorage,
  listMedias,
};

export default mediaService;
