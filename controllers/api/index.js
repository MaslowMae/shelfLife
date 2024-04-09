const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const bookRoute = require("./books.js");
const idbnRoute = require("./idbn.js");

router.use("/users", userRoutes);
router.use("/books", bookRoute);
router.use("/idbn", idbnRoute);

module.exports = router;
