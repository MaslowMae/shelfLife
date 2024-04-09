const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const bookRoute = require("./books.js");
// const isdn = require("./isbn.js");
router.use("/users", userRoutes);
router.use("/books", bookRoute);
// router.use("/idbn", isdn);

module.exports = router;
