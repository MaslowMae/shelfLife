// const Driver = require('./Driver');
// const License = require('./License');
// const Car = require('./Car');

const User = require('./User');
const Post = require('./Post');
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

  // Post.hasMany(Comment, {
  //   foreignKey: 'post_id',
  //   foreignKey: 'user_id',
  //   onDelete: 'CASCADE',
  // });

  // Comment.belongsTo(Post, {
  //   foreignKey: 'user_id',
  //   foreignKey: 'post_id',
  // });

module.exports = { User, Post, Comment, Book} ;