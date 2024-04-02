const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    input: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isbn: { 
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