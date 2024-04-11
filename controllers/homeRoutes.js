const router = require("express").Router();
const { Post, Book } = require("../models");
// const axios = require('axios');

// Display main page with search functionality
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ["bookTitle", "Author"],
      include: [{ model: Post, attributes: ["postTitle"] }],
    });
    const books = bookData.map((book) => book.get({ plain: true }));
    console.log(books);
    res.render("homepage", { books });
    // Fetch posts or perform any necessary logic to display main page
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


router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/signup", (req, res) => {
  console.log("Signup");
  // if (req.session.logged_in) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("signup");
});

module.exports = router;
