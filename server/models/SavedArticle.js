import mongoose from 'mongoose';

const SavedArticleSchema = new mongoose.Schema({
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

const SavedArticle = mongoose.model('SavedArticle', SavedArticleSchema);
export default SavedArticle;
