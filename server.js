const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// handle sign up route
app.post('/signup', async (req, res) => {
  try {
      // Extract form data from request body
      const { firstName, lastName, email, password } = req.body;

      // Create a new user using Sequelize model
      const newUser = await User.create({
          firstName,
          lastName,
          username,
          email,
          password,
          state,
          zipcode
      });

    // Send a success response back to the client
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, send an error response back to the client
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

//start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});