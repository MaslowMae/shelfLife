const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    User: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Date: {
      type: DataTypes.DATE,
    },
    Topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Input: {
      type: DataTypes.TEXT,
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
    modelName: 'post',
  }
);

module.exports = Post;