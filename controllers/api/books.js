const router = require("express").Router();
const { Book, Post, Comment } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["postTitle"],
        },
      ],
    });
    console.log(bookData);
    res.render("books", bookData.dataValues);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newBook = await Book.create({
      bookTitle: req.body.bookTitle,
      Author: req.body.Author,
      Genre: req.body.Genre,
    });
    console.log(newBook);
    res.render("books", newBook.dataValues);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
