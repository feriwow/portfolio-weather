"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bucket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bucket.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Bucket.init(
    {
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "activity is required" },
          notEmpty: { msg: "activity is required" },
        },
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "place is required" },
          notEmpty: { msg: "place is required" },
        },
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "time is required" },
          notEmpty: { msg: "time is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User Id is required" },
          notEmpty: { msg: "User Id is required" },
        },
      },
    },

    {
      sequelize,
      modelName: "Bucket",
    }
  );
  return Bucket;
};
