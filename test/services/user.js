import faker from "faker";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

const assert = chai.assert;

import { userService } from "../../services";
import {
  UserTypes,
  UserStates,
} from "../../services/constant";

import dbunit from "../dbunit/generic";

describe("service://user", function () {
  beforeEach(async () => {
    await dbunit.clean();
    await dbunit.init();
  });

  describe("#create", () => {
    it("should create a new user", async () => {
      const data = {
        email: faker.internet.email(),
        password: faker.internet.password(8),
        type: UserTypes.person,
      };

      const user = await userService.create(data);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.created);
    });

    it("should create a new user with default language", async () => {
      const data = {
        email: faker.internet.email(),
        password: faker.internet.password(8),
        type: UserTypes.person,
        defaultLanguage: "VI",
      };

      const user = await userService.create(data);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.created);
    });

    it("should not create if email already exists", async () => {
      const data = {
        email: "johndoe20102020+1@gmail.com",
        password: faker.internet.password(8),
        type: UserTypes.person,
      };

      await assert.isRejected(
        userService.create(data),
      );
    });
  });

  describe("#get", () => {
    it("should get user by id", async () => {
      let id = 1;
      let user = await userService.get(id);
      assert.isNotNull(user);
      assert.equal(user.email, "johndoe20102020+1@gmail.com");
      assert.equal(user.id, 1);
    });

    it("should throw error if user not found", async () => {
      let id = 100;
      await assert.isRejected(
        userService.get(id),
        `User=[${id}] not found`,
      );
    });

    it("should return null user not found", async () => {
      let id = 100;
      let user = await userService.get(id, null);
      assert.isNull(user);
    });
  });

  describe("#getByEmail", () => {
    it("should get user by email", async () => {
      let email = "johndoe20102020+1@gmail.com";
      let user = await userService.getByEmail(email);
      assert.isNotNull(user);
      assert.equal(user.type, UserTypes.person);
    });

    it("should throw error if user not found", async () => {
      let email = "admin+1@org.com";
      await assert.isRejected(
        userService.getByEmail(email),
        `User=[${email}] not found`,
      );
    });

    it("should return null if user not found", async () => {
      let email = "admin+1@org.com";
      let user = await userService.getByEmail(email, null);
      assert.isNull(user);
    });
  });

  describe("#update", () => {
    it("should update user", async () => {
      let userId = 1;
      let data = {
        defaultLanguage: "EN",
      };
      let user = await userService.update(userId, data);
      assert.isNotNull(user);
      assert.equal(user.defaultLanguage, data.defaultLanguage);
    });
  });

  describe("#changePassword", () => {
    it("should change password user", async () => {
      let userId = 1;
      let oldPassword = "my_password";
      let newPassword = "my_new_password";

      let user = await userService.changePassword(userId, oldPassword, newPassword);
      assert.isNotNull(user);
    });

  });

  describe("#enable", () => {
    it("should enable a created user", async () => {
      let id = 2;
      let user = await userService.enable(id);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.enabled);
    });

    it("should enable a blocked user", async () => {
      let id = 3;
      let user = await userService.enable(id);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.enabled);
    });
  });

  describe("#block", () => {
    it("should block a created user", async () => {
      let id = 2;
      let user = await userService.block(id);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.blocked);
    });

    it("should block an enabled user", async () => {
      let id = 1;
      let user = await userService.block(id);
      assert.isNotNull(user);
      assert.equal(user.state, UserStates.blocked);
    });
  });

  describe("#authenticate", () => {
    it("should authenticate user by email and password", async () => {
      let data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_password",
      };

      let user = await userService.authenticate(data);
      assert.isNotNull(user);
      assert.equal(user.type, UserTypes.person);
    });

    it("should authenticate user by email with uppercase", async () => {
      let data = {
        email: "JohnDoe20102020+1@gmail.com",
        password: "my_password",
      };

      let user = await userService.authenticate(data);
      assert.isNotNull(user);
      assert.equal(user.type, UserTypes.person);
    });

    it("should throw error if email is invalid", async () => {
      let data = {
        email: "admin@org.com",
        password: "my_password",
      };

      await assert.isRejected(
        userService.authenticate(data),
      );
    });

    it("should throw error if password is invalid 2", async () => {
      let data = {
        email: "johndoe20102020+1@gmail.com",
        password: "my_password+1",
      };

      await assert.isRejected(
        userService.authenticate(data),
      );
    });

    it("should throw error if user has just been created", async () => {
      let data = {
        email: "user+2@org.com",
        password: "my_password",
      };

      await assert.isRejected(
        userService.authenticate(data),
      );
    });

    it("should throw error if user is just blocked", async () => {
      let data = {
        email: "user+3@org.com",
        password: "my_password",
      };

      await assert.isRejected(
        userService.authenticate(data),
      );
    });
  });

  describe("#search", () => {
    it("should search users", async () => {
      let query = {};
      let page = 0;
      let limit = 10;

      let result = await userService.search(query, page, limit);
      assert.isNotNull(result);
      assert.equal(result.page, 0);
      assert.equal(result.total, 4);
    });

    it("should search users with state filter", async () => {
      let query = {
        state: UserStates.enabled,
      };
      let page = 0;
      let limit = 10;

      let result = await userService.search(query, page, limit);
      assert.isNotNull(result);
      assert.equal(result.page, 0);
      assert.equal(result.total, 2);
    });

    it("should search users with multi states filter", async () => {
      let query = {
        state: [UserStates.created, UserStates.enabled],
      };
      let page = 0;
      let limit = 10;

      let result = await userService.search(query, page, limit);
      assert.isNotNull(result);
      assert.equal(result.page, 0);
      assert.equal(result.total, 3);
    });

    it("should search users with type filter", async () => {
      let query = {
        type: UserTypes.person,
      };
      let page = 0;
      let limit = 10;

      let result = await userService.search(query, page, limit);
      assert.isNotNull(result);
      assert.equal(result.page, 0);
      assert.equal(result.total, 4);
    });
  });
});
