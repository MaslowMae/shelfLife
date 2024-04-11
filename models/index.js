const User = require("./user");
const Post = require("./post");
const Comment = require('./comment');
const Book = require('./book');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Post, {
  foreignKey: 'book_id',
  });

Post.belongsTo(Book, {
   foreignKey: 'book_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',

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

module.exports = { User, Post, Comment, Book };
