/*eslint no-unused-vars: ["error", { "args": "none" }]*/

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        field: "id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        field: "email",
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        field: "password_hash",
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      type: {
        field: "type",
        type: Sequelize.ENUM("PERSON", "ORGANIZATION"),
        allowNull: false,
        defaultValue: "PERSON",
      },
      state: {
        field: "state",
        type: Sequelize.ENUM("CREATED", "ENABLED", "BLOCKED"),
        allowNull: false,
        defaultValue: "CREATED",
      },
      defaultLanguage: {
        field: "default_language",
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "EN",
      },
      createdDate: {
        field: "created_date",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedDate: {
        field: "updated_date",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
