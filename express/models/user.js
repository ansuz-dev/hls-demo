import Sequelize from "sequelize";

const modelDef = {
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.DataTypes.ENUM("PERSON", "ORGANIZATION"),
    allowNull: false,
    defaultValue: "PERSON",
  },
  state: {
    type: Sequelize.DataTypes.ENUM("CREATED", "ENABLED", "BLOCKED"),
    allowNull: false,
    defaultValue: "CREATED",
  },
  defaultLanguage: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: "EN",
  },
};

const model = sequelize => {
  class User extends Sequelize.Model {

  }

  User.init(modelDef, {
    sequelize,
    modelName: "User",
  });

  User.prototype.toJSON = function toJSON() {
    const data = {
      email: this.email,
      type: this.type,
      defaultLanguage: this.defaultLanguage,
    };

    return data;
  };

  return User;
};

export default model;
