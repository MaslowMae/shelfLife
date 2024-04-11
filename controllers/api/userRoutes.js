const router = require("express").Router();
const { User } = require("../../models");

// handle sign up route
// router.post("/signup", async (req, res) => {
//   console.log("Hello");
//   console.log(req.body);
//   try {
//     // Extract form data from request body
//     const { firstName, lastName, username, email, password, state, zipcode } =
//       req.body;

//     //hashing password
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user using Sequelize model
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       username,
//       email,
//       password,
//       // password: hashedPassword, //stored hashed password
//       state,
//       zipcode,
//     });

//     // Send a success response
//     res.send(200).json({ message: "success", user: newUser });
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error("failed to create user:", error);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    // Extract form data from request body
    const { email, username, password } = req.body;

    // Create a new user using Sequelize model
    const newUser = await User.create({
      email,
      username,
      password,
    });

    // Send a success response

    res.send(200).json({ message: "success", user: newUser });
  } catch (error) {

    res.status(200).json({
      message: "Welcome to Shelfie!",
      user: newUser,
    })
    } catch (error) {

    // If an error occurs, send an error response
    console.error("failed to create user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// log in route
// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: { username: req.body.username, email: req.body.email },
//     });
//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect username or password, please try again" });
//       return;
//     }
//     //   checking for valid password
//     const validPassword = await userData.checkPassword(req.body.password);
//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect username or password, please try again" });
//       return;
//     }
//     // session save for status of log in
//     console.log(userData);
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//     res.render("profile");
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// log in route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !email) {
      res.send("Incorrect email or password.");
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.send("Incorrect email or password.");
      return;
    }

    req.session.user_id = user.id;
    req.session.save(() => {
      res.redirect("/profile");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to render the profile page
router.get("/profile", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  const userEmail = req.session.email;

  res.render("profile", { email: userEmail });
});

router.get("/profile/:id", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    if (!req.session.user_id) {
      return res.redirect("/");
    }
    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).json({ message: "logged out" });
  }
});

module.exports = router;
