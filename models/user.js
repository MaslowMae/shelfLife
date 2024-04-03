const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [8] },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: { beforeCreate: async (newUserData) => { newUserData.password.email = await bcrypt.hash(newUserData.password.email, 10); return newUserData; }, },
  },
);
  beforeUpdate: async (updatedUserData) => {
    updatedUserData.email = await updatedUserData.email.toLowerCase();
    return updatedUserData;
  },
  {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
  }

module.exports = User;