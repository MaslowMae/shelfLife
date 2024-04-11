const router = require("express").Router();
const { User } = require("../../models");

// handle sign up route
// router.post("/signup", async (req, res) => {
//   try {
//     const newUser = await User.create({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       state: req.body.state,
//       zipcode: req.body.zipcode,
//     });

//     req.session.save(() => {
//       req.session.user_id = newUser.id;
//       req.session.logged_in = true;

//       res.status(200).json(newUser);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
router.post("/signup", async (req, res) => {
  console.log("Hello");
  console.log(req.body);
  try {
    // Extract form data from request body
    const { firstName, lastName, username, email, password, state, zipcode } =
      req.body;

    //hashing password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Sequelize model
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      // password: hashedPassword, //stored hashed password
      state,
      zipcode,
    });

    // Send a success response
    req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
    
  //   res.send(200).json({ message: "success", user: newUser });
  // } 
  // catch (error) {

    // res.status(200).json({
    //   message: "Welcome to Shelfie!",
    //   user: newUser,
    // })
  // }
  //   catch (error) {

  //   // If an error occurs, send an error response
  //   console.error("failed to create user:", error);
  //   res.status(500).json({ error: "Failed to create user" });
  // }
});

// log in route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      // res.status(400).json({ message: `${userData.username} does not exist` });
      res
        .status(400)
        .json({ message: `${req.body.username} is not a valid username` });
      return;
    }
const validPassword = await bcrypt.compare(
  req.body.password,
  userData.password
);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
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
