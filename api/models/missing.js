"use strict";

module.exports = (sequelize, DataTypes) => {
  const Missing = sequelize.define(
    "missing",
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

      missing: {
        type: DataTypes.INTEGER,
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
      tableName: "missing",
      classMethods: {},
    }
  );

  Missing.associate = function (models) {
    // associations can be defined here
  };

  return Missing;
};