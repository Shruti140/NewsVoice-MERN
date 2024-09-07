import express from 'express';
const router=express.Router();
import Post from '../models/Post.js';

// Get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Add a new post
  router.post('/', async (req, res) => {
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
      username: req.body.username,
      userId: req.body.userId,
      categories: req.body.categories,
    });
  
    try {
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update a post
  router.put('/:id', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a post
  router.delete('/:id', async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export default router;