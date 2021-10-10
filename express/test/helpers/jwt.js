/* eslint-disable max-lines-per-function */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {jwtHelper} from "../../helpers/index.js";

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

describe("helper://jwt", () => {
  describe("#computeUserToken", () => {
    it("should compute user token", () => {
      const user = {
        id: 1,
        passwordHash: "demo",
      };
      const token = jwtHelper.computeUserToken(user, true);
      assert.isString(token);
    });
  });

  describe("#verifyUserToken", () => {
    it("should verify user token", () => {
      const user = {id: 1, passwordHash: "demo"};
      const token = jwtHelper.computeUserToken(user);
      const data = jwtHelper.verifyUserToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
    });

    it("should not verify user token if password is changed", () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2hlY2tzdW0iOiJlMTAwIiwiaWF0IjoxNTk0NzQzOTExLCJhdWQiOiJvcGVyYXRvciIsImlzcyI6ImhybGFuY2VyIiwic3ViIjoiYWNjZXNzIn0.8Bn0IdG--2fqaOToKXhWbn9NP3jTlcRxhsn0YsX29IQ";
        jwtHelper.verifyUserToken(token);
      } catch (error) {
        assert.isNotNull(error);
      }
    });
  });

  describe("#computeConfirmationToken", () => {
    it("should compute confirmation token", () => {
      const user = {id: 1};
      const token = jwtHelper.computeConfirmationToken(user);
      assert.isString(token);
    });
  });

  describe("#verifyConfirmationToken", () => {
    it("should verify confirmation token", () => {
      const user = {id: 1};
      const token = jwtHelper.computeConfirmationToken(user);
      const data = jwtHelper.verifyConfirmationToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
    });
  });

  describe("#computeResetToken", () => {
    it("should compute reset token for user", () => {
      const user = {id: 1, passwordHash: "demo"};
      const token = jwtHelper.computeResetToken(user);
      assert.isString(token);
    });
  });

  describe("#verifyResetToken", () => {
    it("should verify reset password token for user", () => {
      const user = {id: 1, passwordHash: "demo"};
      const token = jwtHelper.computeResetToken(user);
      const data = jwtHelper.verifyResetToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
      assert.isString(data.checksum);
    });
  });
});
