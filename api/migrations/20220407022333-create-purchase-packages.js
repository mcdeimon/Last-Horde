"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchase_packages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      package: {
        type: Sequelize.INTEGER,
      },

      account: {
        type: Sequelize.CHAR,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("purchase_packages");
  },
};
