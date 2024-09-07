import mongoose from 'mongoose';

const SavedNewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  author: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
  content: {
    type: String,
  },
  userId: {
    type: String,
  },
}, { timestamps: true });

const SavedNews = mongoose.model('SavedNews', SavedNewsSchema);
export default SavedNews;
