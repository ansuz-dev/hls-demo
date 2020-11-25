/*eslint no-unused-vars: ["error", { "args": "none" }]*/

"use strict";

const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      field: "id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      field: "email",
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      field: "password_hash",
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    type: {
      field: "type",
      type: DataTypes.ENUM("PERSON", "ORGANIZATION"),
      allowNull: false,
      defaultValue: "PERSON"
    },
    state: {
      field: "state",
      type: DataTypes.ENUM("CREATED", "ENABLED", "BLOCKED"),
      allowNull: false,
      defaultValue: "CREATED",
    },
    defaultLanguage: {
      field: "default_language",
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "EN",
    },
    createdDate: {
      field: "created_date",
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedDate: {
      field: "updated_date",
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: "User",
    tableName: "Users",
    freezeTableName: true,
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  });

  User.prototype.toJSON = function() {
    let data = {
      email: this.email,
      type: this.type,
      defaultLanguage: this.defaultLanguage,
    };

    return data;
  };

  return User;
};
