const User = require("./User");
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

module.exports = { User, Post, Comment, Book} ;