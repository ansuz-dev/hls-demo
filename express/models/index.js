import Sequelize from "sequelize";
import cls from "cls-hooked";

import secrets from "../../secrets.js";
import User from "./user.js";

const namespace = cls.createNamespace("template");

Sequelize.useCLS(namespace);

const config = {...secrets.db};

// eslint-disable-next-line no-process-env
const env = process.env.NODE_ENV || "development";

if (env === "test") {
  config.database += "_test";
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const UserModel = User(sequelize);

const db = {[UserModel.name]: UserModel};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
