// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");


class User extends Model { }

User.init({

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
    name:"firstName"
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    name:"lastName"
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    name:"username"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    name:"email"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8] },
    name:"password"
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    name:"state"
  },
  zipcode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name:"zipcode"
  },
},
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        if (newUserData.email) {
          newUserData.email = newUserData.email.toLowerCase();
        }
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.email) {
          updatedUserData.email = updatedUserData.email.toLowerCase();
          return updatedUserData;
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user"
  }
);

module.exports = User;
