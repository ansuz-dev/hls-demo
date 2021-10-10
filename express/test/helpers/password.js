/* eslint-disable no-magic-numbers */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {passwordHelper} from "../../helpers/index.js";

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

describe("helper://password", () => {
  describe("#random", () => {
    it("should generate a random password", () => {
      const pass = passwordHelper.random();
      assert.isString(pass);
      assert.lengthOf(pass, 12);
    });
  });

  describe("#hash", () => {
    it("should hash a password", async () => {
      const password = "einsteins";
      const hash = await passwordHelper.hash(password);
      assert.isString(hash);
      assert.lengthOf(hash, 60);
    });
  });
});
