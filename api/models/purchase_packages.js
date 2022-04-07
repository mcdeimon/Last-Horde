"use strict";

module.exports = (sequelize, DataTypes) => {
  const Purchase_packages = sequelize.define(
    "purchase_packages",
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

      package: {
        type: DataTypes.INTEGER,
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
      tableName: "purchase_packages",
      classMethods: {},
    }
  );

  Purchase_packages.associate = function (models) {
    // associations can be defined here
  };

  return Purchase_packages;
};
