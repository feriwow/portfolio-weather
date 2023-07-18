'use strict';
const { hashPassword } = require('../helper/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Bucket, {
        foreignKey:"UserId"
      })
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email has already been registered"},
      validate: {
        notEmpty: {msg: "email must not be empty"},
        notNull: {msg: "email must not be empty"},
        isEmail: {msg: "email format incorrect"}
      }},
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "password is required"},
        notNull: {msg: "password is required"},
        len: {
          args: [5],
          msg: "password must be longer than 5 letter"
        }
      }}
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};