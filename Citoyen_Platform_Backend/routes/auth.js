const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const app = express();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    req.session.userId = user._id;
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user: ' + error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Added log
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials'); // Added log
      return res.status(400).send('Invalid credentials');
    }
    req.session.userId = user._id;
    res.send({ message: 'Login successful', userId: user._id }); // Return user ID for frontend use
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout successful');
});

module.exports = router;
