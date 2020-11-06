const mongoose = require('mongoose')

const BookmarkSchema = new mongoose.Schema({
  link:{
      type: String,
      required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'private',
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Bookmark = module.exports = mongoose.model('Bookmark', BookmarkSchema)


module.exports.addBookmark = function(newBookmark, callback){
  //if(err) throw err;
  newBookmark.save(callback);
}

// show dashboard items
module.exports.getBookmarkByUser = function(id, callback){
  const query = {user:id}
  Bookmark.find(query,callback);
}