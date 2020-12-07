const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

import { passwordHelper } from "../../helpers";

describe("helper://password", function () {

  describe("#random", () => {
    it("should generate a random password", () => {
      let pass = passwordHelper.random();
      assert.isString(pass);
      assert.lengthOf(pass, 12);
    });
  });

  describe("#hash", () => {
    it("should hash a password", async () => {
      let password = "einsteins";
      let hash = await passwordHelper.hash(password);
      assert.isString(hash);
      assert.lengthOf(hash, 60);
      console.log(hash);
    });
  });

});
