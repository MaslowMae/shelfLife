const express = require('express');
const router = express.Router();
const { Post, Book } = require('../../models');

// Display main page with search functionality
router.get('/', async (req, res) => {
  try {
    // Fetch posts or perform any necessary logic to display main page
    res.render('main');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle book search and display related posts
router.post('/search', async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Perform book search based on searchTerm
    const foundBook = await Book.findOne({ where: { title: searchTerm } });

    if (!foundBook) {
      // Handle case where book is not found
      res.render('search-results', { message: 'Book not found' });
    } else {
      // Fetch posts related to the found book
      const relatedPosts = await Post.findAll({ where: { book_id: foundBook.id } });
      res.render('search-results', { relatedPosts });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;