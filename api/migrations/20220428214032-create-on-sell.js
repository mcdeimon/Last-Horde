"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("on_sells", {
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
      price: {
        type: Sequelize.INTEGER,
      },
      /* expiration_days: {
        type: Sequelize.INTEGER,
      }, */
      order_id: {
        type: Sequelize.INTEGER,
      },
      sold: {
        type: Sequelize.BOOLEAN,
      },
      /* expired: {
        type: Sequelize.BOOLEAN,
      },
      created_days: {
        type: DataTypes.DATE,
      }, */
      canceled: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("on_sell");
  },
};
