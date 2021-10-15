import chai, {assert} from "chai";
import chaiAsPromised from "chai-as-promised";

import {mediaService} from "../../services/index.js";

chai.should();
chai.use(chaiAsPromised);

describe("service://media", () => {
  describe("#listMedias", () => {
    it("should list medias", async () => {
      const res = await mediaService.listMedias();
      assert.isArray(res);
    });
  });
});
