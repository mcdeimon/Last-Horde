"use strict";

module.exports = (sequelize, DataTypes) => {
  const My_favorites = sequelize.define(
    "my_favorites",
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
    },

    {
      timestamps: false,
      freezeTableName: true,
      tableName: "my_favorites",
      classMethods: {},
    }
  );

  My_favorites.associate = function (models) {
    // associations can be defined here
  };

  return My_favorites;
};
