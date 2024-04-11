const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const commentRoutes = require("./commentRoutes.js")
const bookRoute = require("./books.js");
// const isdn = require("./isbn.js");
router.use("/users", userRoutes);
router.use("/books", bookRoute);
router.use("/comments", commentRoutes);
// router.use("/idbn", isdn);

module.exports = router;
