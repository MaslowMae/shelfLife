const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;