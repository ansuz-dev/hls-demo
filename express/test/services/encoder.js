import path from "path";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {encoder} from "../../services/index.js";

chai.should();
chai.use(chaiAsPromised);

// eslint-disable-next-line no-shadow
const __dirname = path.resolve();

describe("service://encoder", () => {
  describe("#encoderHLS", () => {
    it("should encode MP4 video to HLS", async () => {
      const file = path.join(__dirname, "express/test/files/video.mp4");

      await encoder.encodeHLS(file);
    });
  });
});
