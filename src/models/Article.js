import mongoose from 'mongoose';

const ArticleScheme = mongoose.Schema({
  name: {type: String, required: true},
  upvotes: {type: Number, required: true},
  comments: {type: [], required: true},
});

module.exports = mongoose.model('Article',ArticleScheme);