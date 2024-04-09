<<<<<<< HEAD
const router = require('express').Router();
const { User,Post } = require('../models');

// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await Post.findAll({
      attributes: { exclude: ['password'] },
      include:[{model: User, attributes:["username"]}]
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
})
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


=======
const express = require("express");
const router = express.Router();
const { Post, Book } = require('../models');
const axios = require('axios');


// Display main page with search functionality
router.get("/", async (req, res) => {
  try {
    // Fetch posts or perform any necessary logic to display main page
    res.render("homepage");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle book search and display related posts
router.post("/search", async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Perform book search based on searchTerm
    const foundBook = await Book.findOne({ where: { title: searchTerm } });

    if (!foundBook) {
      // Handle case where book is not found
      res.render("search-results", { message: "Book not found" });
    } else {
      // Fetch posts related to the found book
      const relatedPosts = await Post.findAll({
        where: { book_id: foundBook.id },
      });
      res.render("search-results", { relatedPosts });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//davids code

// router.get('/', async (req, res) => {
//   try {
//     const userData = await Post.findAll({
//       attributes: { exclude: ['password'] },
//       include:[{model: User, attributes:["username"]}]
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// })
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

>>>>>>> dc2251a33489e178b73c6eff2d0c68daa25fe3ef
module.exports = router;
