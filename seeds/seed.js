const sequelize = require('../config/connection');
const { User, Book, Post, Comment } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
<<<<<<< HEAD
    
=======

>>>>>>> main
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
<<<<<<< HEAD
    
    await Book.bulkCreate(bookData);
    
    await Post.bulkCreate(postData);
    
    await Comment.bulkCreate(commentData);
    
=======

    await Book.bulkCreate(bookData);

    await Post.bulkCreate(postData);

    await Comment.bulkCreate(commentData);

>>>>>>> main
    process.exit(0);

};
seedDatabase();