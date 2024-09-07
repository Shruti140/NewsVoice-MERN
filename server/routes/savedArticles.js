import express from 'express';
import SavedNews from '../models/SavedNews.js';

const router = express.Router();

// Save an article
router.post('/', async (req, res) => {
  const newNews = new SavedNews({
      title: req.body.title,
      url: req.body.url,
      urlToImage: req.body.urlToImage,
      author: req.body.author,
      publishedAt: req.body.publishedAt,
      content: req.body.content,
      userId: req.body.userId,
    });
  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get saved articles for a user
router.get('/', async (req, res) => {
  try {
    const savedNews = await SavedNews.find();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a article
router.delete('/:id', async (req, res) => {
  try {
    await SavedNews.findByIdAndDelete(req.params.id);
    res.json({ message: 'SavedNews deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
