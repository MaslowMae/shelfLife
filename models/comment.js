const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    Input: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;