const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
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
      reason: {
        type: String
        
      }
})

 const Content= module.exports = mongoose.model('Content', ContentSchema)

module.exports.addContent = function(newContent, callback){
    newContent.save(callback);
}

// show dashboard content
module.exports.getContentByUser = function(id, callback){
  const query = {user:id}
  console.log(query)
  Content.find(query,callback);
}

//show content in edit form 
module.exports.showContent = function(id,callback){
  //const query = {_id:id}
  Content.findById({_id:id},callback)
}

/* //show bookmark in edit form 
module.exports.showBookmark=function(id,callback){
  const query = {_id:id}
  Bookmark.findById(query,callback)
} */

//delete user content
module.exports.deleteContent = function(id ,callback){
  
  const query = {_id: id}
  Content.findOneAndRemove(query,callback)
}

//show requested contents
module.exports.showRequest = function(callback){
  const query = {status: 'pending'}
  Content.find(query,callback)
}

module.exports.getPublicContent = function(callback){
  const query = {status: 'public'}
  Content.find(query,callback)
}

/* module.exports.searchContent = function(title,callback){
  const query = {title: title}
  //console.log(query)
  Content.find(query,callback)
} */