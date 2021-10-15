/* eslint-disable max-len */
import path from "path";
import {exec} from "child_process";
import util from "util";
import httpError from "http-errors";

const execAsync = util.promisify(exec);

const encodeHLS = async file => {
  const targetDir = path.dirname(file);
  const ext = path.extname(file);
  const masterName = path.basename(file, ext);

  try {
    await execAsync(`ffmpeg -hide_banner -loglevel error \
      -i ${file} \
      -ss 00:00:01.000 -frames:v 1 ${targetDir}/thumbnail.jpg \
      -filter_complex "[0:v]split=4[v1][v2][v3][v4]; [v1]scale=1920:-1[v1out]; [v2]scale=1280:-1[v2out]; [v3]scale=864:-1[v3out]; [v4]scale=640:-1[v4out]" \
      -map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1:fps=30000/1001" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
      -map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1:fps=30000/1001" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
      -map [v3out] -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1:fps=30000/1001" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 2M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
      -map [v4out] -c:v:3 libx264 -x264-params "nal-hrd=cbr:force-cfr=1:fps=30000/1001" -b:v:3 1M -maxrate:v:3 1M -minrate:v:3 1M -bufsize:v:3 2M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
      -map a:0 -c:a:0 aac -b:a:0 128k -ac 2 \
      -map a:0 -c:a:1 aac -b:a:1 128k -ac 2 \
      -map a:0 -c:a:2 aac -b:a:2 128k -ac 2 \
      -map a:0 -c:a:3 aac -b:a:3 128k -ac 2 \
      -f hls \
      -hls_time 2 \
      -hls_playlist_type vod \
      -hls_flags independent_segments \
      -hls_segment_type mpegts \
      -hls_segment_filename ${targetDir}/stream_%v/data%02d.ts \
      -master_pl_name ${masterName}.m3u8 \
      -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3" ${targetDir}/stream_%v/index.m3u8`);
  } catch (error) {
    console.log(error);
    throw httpError.BadRequest(`Can't encode file=[${file}]`);
  }
};

const encoder = {encodeHLS};

export default encoder;
