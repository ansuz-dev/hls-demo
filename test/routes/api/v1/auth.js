import faker from "faker";
import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

const server = require("../../../../bin/www");

import dbunit from "../../../dbunit/generic";

describe("route://api/v1/auth", () => {

  beforeEach(async () => {
    await dbunit.clean();
    await dbunit.init();
  });

  describe("#register", () => {
    it("api v1 - should regisger a new account", async () => {
      const data = {
        email: faker.internet.email(),
        password: faker.internet.password(8),
        defaultLanguage: "VI"
      };

      return chai.request(server)
        .post("/api/v1/auth/register")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });

  });

  describe("#login", () => {
    it("api v1 - should login to the system", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_password",
      };

      return chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
          assert.isString(res.body.token);
        });
    });

    it("api v1 - should throw error if invalid email", async () => {
      const data = {
        email: "user_bad@org.com",
        password: "my_password",
      };

      return chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });

    it("api v1 - should throw error if invalid password", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_bad_password",
      };

      return chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });

    it("api v1 - should throw error if user is blocked", async () => {
      const data = {
        email: "user+5@org.com",
        password: "my_password",
      };

      return chai.request(server)
        .post("/api/v1/auth/login")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });
  });

  describe("#resetPassword", () => {
    it("api v1 - should request to reset password by user", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
      };

      return chai.request(server)
        .put("/api/v1/auth/password")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });

    it("api v1 - should allow to use invalid email by user", async () => {
      const data = {
        email: "invalid@gmail.com",
      };

      return chai.request(server)
        .put("/api/v1/auth/password")
        .set("X-Requested-With", "XMLHttpRequest")
        .send(data)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });
});
