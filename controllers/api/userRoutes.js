const express = require('express');
const router = require('express').Router();
const { User } = require('../../models');


// log in route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
//   checking for valid password
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
// session save for status of log in 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
// handle sign up route
router.post('/signup', async (req, res) => {
    try {
        // Extract form data from request body
        const { firstName, lastName, username, email, password, state, zipcode } = req.body;
  
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
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // If an error occurs, send an error response back to the client
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

module.exports = router;