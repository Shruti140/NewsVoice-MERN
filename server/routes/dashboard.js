import express from 'express';
const router = express.Router();

import Post from '../models/Post.js';
import User from '../models/Users.js';
import Interaction from '../models/Interaction.js';

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const userCount = await User.countDocuments();
    const interactionCount = await Interaction.countDocuments();
    const activeUsers = await Interaction.distinct('userId').then(users => users.length);

    res.json({
      postCount,
      userCount,
      interactionCount,
      activeUsers,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get top articles
router.get('/top-articles', async (req, res) => {
  try {
    const topArticles = await Post.find().sort({ views: -1 }).limit(5);
    res.json(topArticles);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
