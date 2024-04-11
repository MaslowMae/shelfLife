// models/User.js
const express = require('express');
const router = express.Router();
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
    
  },
  lastName: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
   
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
    modelName: "user"
  }
);

module.exports = User;
