mongoose = require('mongoose');

PostSchema = new mongoose.Schema({
  _id: String,
  title: String,
  url: String,
  ranks: [Number]
}, {
  _id: false
});

mongoose.model('Post', PostSchema);
