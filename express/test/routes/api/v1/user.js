
import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";

import server from "../../../../index";
import dbunit from "../../../dbunit/generic";

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
        .then((res) => {
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
      return chai.request(server)
        .get("/api/v1/user")
        .set("X-Requested-With", "XMLHttpRequest")
        .set("authorization", `Bearer ${_token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          assert.equal(res.body.email, "johndoe20102020+1@gmail.com");
        });
    });
  });

  describe("#updateOwnInfo", () => {
    it("api v1 - should update information of logged user", async () => {
      let data = {
        defaultLanguage: "EN",
      };

      return chai.request(server)
        .put("/api/v1/user")
        .set("X-Requested-With", "XMLHttpRequest")
        .set("authorization", `Bearer ${_token}`)
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
          assert.equal(res.body.defaultLanguage, data.defaultLanguage);
        });
    });
  });

  describe("#deleteOwnAccount", () => {
    it("api v1 - should delte logged user", async () => {
      return chai.request(server)
        .delete("/api/v1/user")
        .set("X-Requested-With", "XMLHttpRequest")
        .set("authorization", `Bearer ${_token}`)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("#changePassword", () => {
    it("api v1 - should change password of logged user", async () => {
      let data = {
        oldPassword: "my_password",
        newPassword: "my_new_password",
      };

      return chai.request(server)
        .put("/api/v1/user/password")
        .set("X-Requested-With", "XMLHttpRequest")
        .set("authorization", `Bearer ${_token}`)
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });
});
