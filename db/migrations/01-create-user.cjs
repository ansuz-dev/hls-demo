/* eslint no-unused-vars: ["error", { "args": "none" }]*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("PERSON", "ORGANIZATION"),
        allowNull: false,
        defaultValue: "PERSON",
      },
      state: {
        type: Sequelize.ENUM("CREATED", "ENABLED", "BLOCKED"),
        allowNull: false,
        defaultValue: "CREATED",
      },
      defaultLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "EN",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
