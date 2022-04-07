"use strict";

module.exports = (sequelize, DataTypes) => {
  const Amount_nfts = sequelize.define(
    "amount_nfts",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      amount: {
        type: DataTypes.INTEGER,
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
      tableName: "amount_nfts",
      classMethods: {},
    }
  );

  Amount_nfts.associate = function (models) {
    // associations can be defined here
  };

  return Amount_nfts;
};
