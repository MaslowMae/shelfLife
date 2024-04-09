const router = require("express").Router();
const { Book, Post } = require("../../models");

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

router.post("/books/post", async (req, res) => {
  try {
    const bookData = await Post.create(req.body, {
      comment: req.body.comment,
    });
    bookData.push(req.body);
    res.render("books", bookData.dataValues);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
