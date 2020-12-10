const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

import {jwtHelper} from "../../helpers";

describe("helper://jwt", function () {

  describe("#computeUserToken", () => {
    it("should compute user token", () => {
      let user = {
        id: 1,
        passwordHash: "demo",
      };
      let token = jwtHelper.computeUserToken(user, true);
      assert.isString(token);
    });
  });

  describe("#verifyUserToken", () => {
    it("should verify user token", async () => {
      let user = {id: 1, passwordHash: "demo"};
      let token = jwtHelper.computeUserToken(user);
      let data = jwtHelper.verifyUserToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
    });

    it("should not verify user token if password is changed", async () => {
      try {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2hlY2tzdW0iOiJlMTAwIiwiaWF0IjoxNTk0NzQzOTExLCJhdWQiOiJvcGVyYXRvciIsImlzcyI6ImhybGFuY2VyIiwic3ViIjoiYWNjZXNzIn0.8Bn0IdG--2fqaOToKXhWbn9NP3jTlcRxhsn0YsX29IQ";
        jwtHelper.verifyUserToken(token);
      } catch(error) {
        assert.isNotNull(error);
      }
    });
  });

  describe("#computeConfirmationToken", () => {
    it("should compute confirmation token", () => {
      let user = {
        id: 1,
      };
      let token = jwtHelper.computeConfirmationToken(user);
      assert.isString(token);
    });
  });

  describe("#verifyConfirmationToken", () => {
    it("should verify confirmation token", async () => {
      let user = {id: 1};
      let token = jwtHelper.computeConfirmationToken(user);
      let data = jwtHelper.verifyConfirmationToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
    });
  });

  describe("#computeResetToken", () => {
    it("should compute reset token for user", () => {
      let user = {id: 1, passwordHash: "demo"};
      let token = jwtHelper.computeResetToken(user);
      assert.isString(token);
    });
  });

  describe("#verifyResetToken", () => {
    it("should verify reset password token for user", async () => {
      let user = {id: 1, passwordHash: "demo"};
      let token = jwtHelper.computeResetToken(user);
      let data = jwtHelper.verifyResetToken(token);
      assert.isObject(data);
      assert.equal(data.id, 1);
      assert.isString(data.checksum);
    });
  });
});
