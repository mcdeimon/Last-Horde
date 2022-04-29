"use strict";

module.exports = (sequelize, DataTypes) => {
  const On_sell = sequelize.define(
    "on_sell",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      account: {
        type: DataTypes.CHAR,
      },

      id_nft: {
        type: DataTypes.INTEGER,
      },

      price: {
        type: DataTypes.INTEGER,
      },

      expiration_days: {
        type: DataTypes.INTEGER,
      },

      order_id: {
        type: DataTypes.INTEGER,
      },

      sold: {
        type: DataTypes.BOOLEAN,
      },

      expired: {
        type: DataTypes.BOOLEAN,
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
      tableName: "on_sell",
      classMethods: {},
    }
  );

  On_sell.associate = function (models) {
    // associations can be defined here
  };

  return On_sell;
};
