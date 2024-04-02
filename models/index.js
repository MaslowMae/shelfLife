const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Book = require('./book');



User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

  Post.hasMany(Book, {
    foreignKey: 'post_id',
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

  Comment.belongsTo(Post, {
    foreignKey: 'user_id',
    foreignKey: 'post_id',
  });

