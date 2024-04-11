const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

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
    const { username, email, password } =
      req.body;

    //hashing password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Sequelize model
    const newUser = await User.create({
      // firstName,
      // lastName,
      username,
      email,
      password,
      // password: hashedPassword, //stored hashed password
      // state,
      // zipcode,
    });
    
    // Send a success response
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Failed to save session." });
      }
      res.redirect("/profile");
    })
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
// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: { username: req.body.username },
//     });
//     if (!userData) {
//       // res.status(400).json({ message: `${userData.username} does not exist` });
//       res
//         .status(400)
//         .json({ message: `${req.body.username} is not a valid username` });
//       return;
//     }
// const validPassword = await bcrypt.compare(
//   req.body.password,
//   userData.password
// );
//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password, please try again" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.username = userData.username;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Route to render the login page
router.get('/', (req, res) => {
  res.render('login');
});

// Route to handle login logic
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.send('Incorrect email or password.');
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.send('Incorrect email or password.');
      return;
    }

    req.session.user_id = user.id;
    req.session.save(() => {
      res.redirect('/profile');
    })
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the profile page
// router.get('/profile', (req, res) => {
//   if (!req.session.user_id) {
//      return res.redirect('/');
//   }
//   const userEmail = req.session.email;

//   res.render('profile', { email: userEmail });
// });
router.get("/profile", async (req, res) => {
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
