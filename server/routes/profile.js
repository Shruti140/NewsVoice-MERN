import express from 'express';
import User from '../models/Users.js';

const router = express.Router();

// Fetch all user profiles
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create a new user profile
router.post('/', async (req, res) => {
  const { username, email, password, bio, photo } = req.body;
  try {
    const user = new User({ username, email, password, bio, photo });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  const { username, email, bio, photo } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, bio, photo },
      { new: true }
    );
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
