/* eslint-disable no-magic-numbers */
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

let _token = null;

describe("route://api/v1/user", () => {
  before(async () => {
    await dbunit.clean();
    await dbunit.init();

    return Promise.all([
      chai.request(server)
        .post("/api/v1/auth/login")
        .send({
          email: "johndoe20102020+1@gmail.com",
          password: "my_password",
        })
        .then(res => {
          _token = res.body.token;
        }),
    ]);
  });

  beforeEach(async () => {
    await dbunit.clean();
    await dbunit.init();
  });

  describe("#getOwnInfo", () => {
    it("api v1 - should get information of logged user", async () => {
      const res = await chai.request(server)
        .get("/api/v1/user")
        .set("X-Requested-With", "XMLHttpRequest")
        .set("authorization", `Bearer ${_token}`);

      expect(res).to.have.status(200);
      assert.equal(res.body.email, "johndoe20102020+1@gmail.com");
    });
  });
});
