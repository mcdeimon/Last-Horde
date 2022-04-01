"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("my_favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      account: {
        type: Sequelize.CHAR,
      },

      id_nft: {
        type: Sequelize.INTEGER,
      },

      contract: {
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
    await queryInterface.dropTable("my_favorites");
  },
};
