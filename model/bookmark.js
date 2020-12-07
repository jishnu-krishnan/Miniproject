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

//delete user boomark
module.exports.deleteBookmark = function(id ,callback){
  
  const query = {_id: id}
  Bookmark.findOneAndRemove(query,callback)
}

/* //show bookmark in edit form 
module.exports.showBookmark=function(id,callback){
  const query = {_id:id}
  Bookmark.findById(query,callback)
} */


// edit bookmark
module.exports.editBookmark=function(id,bm,callback){
  const query = {_id:id}
  Bookmark.findByIdAndUpdate(query,bm,callback)
}

module.exports.getPublicBookmark = function(callback){
  const query = {status: 'public'}
  Bookmark.find(query,callback)
}

module.exports.searchBookmark = function(id,title, callback){
  const query = {title : title, user: id}
  //console.log(query)
  Bookmark.find(query,callback)
}
