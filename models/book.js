
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const axios = require('axios');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ISBN: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    coverImageURL: {
      type: DataTypes.STRING, // Assuming cover image URL is a string
      allowNull: true // Allow null if cover image URL is optional
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'book',
  }
);

module.exports = Book;
