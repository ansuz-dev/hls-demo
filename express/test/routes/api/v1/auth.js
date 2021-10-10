/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";

import server from "../../../../index.js";
import dbunit from "../../../dbunit/generic.js";

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe("route://api/v1/auth", () => {
  beforeEach(async () => {
    await dbunit.clean();
    await dbunit.init();
  });

  describe("#login", () => {
    it("api v1 - should login to the system", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_password",
      };

      const res = await chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data);

      expect(res).to.have.status(200);
      assert.isString(res.body.token);
    });

    it("api v1 - should throw error if invalid email", async () => {
      const data = {
        email: "user_bad@org.com",
        password: "my_password",
      };

      const res = await chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data);

      expect(res).to.have.status(401);
    });

    it("api v1 - should throw error if invalid password", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_bad_password",
      };

      const res = await chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data);

      expect(res).to.have.status(401);
    });

    it("api v1 - should throw error if user is blocked", async () => {
      const data = {
        email: "user+5@org.com",
        password: "my_password",
      };

      const res = await chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data);

      expect(res).to.have.status(401);
    });
  });
});
