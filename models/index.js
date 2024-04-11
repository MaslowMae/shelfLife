const Sequelize = require('sequelize');
//DATABASE CREDENTIALS!!
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
  }
);
const User = require("./user")
const Post = require("./Post");
const Comment = require('./Comment');
const Book = require('./Book');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

Book.hasMany(Post, {
    foreignKey: 'book_id',
  });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete:'CASCADE',
  });

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

module.exports = {sequelize, User}

module.exports = { User, Post, Comment, Book} ;