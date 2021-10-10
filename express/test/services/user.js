import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {userService} from "../../services/index.js";

import dbunit from "../dbunit/generic.js";

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

describe("service://user", () => {
  beforeEach(async () => {
    await dbunit.clean();
    await dbunit.init();
  });

  describe("#get", () => {
    it("should get user by id", async () => {
      const id = 1;
      const user = await userService.get(id);
      assert.isNotNull(user);
      assert.equal(user.email, "johndoe20102020+1@gmail.com");
      assert.equal(user.id, 1);
    });

    it("should throw error if user not found", async () => {
      const id = 100;
      await assert.isRejected(
        userService.get(id),
        `User=[${id}] not found`,
      );
    });

    it("should return null user not found", async () => {
      const id = 100;
      const user = await userService.get(id, null);
      assert.isNull(user);
    });
  });
});
