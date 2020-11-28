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
      }
})

 const Content= module.exports = mongoose.model('Content', ContentSchema)

module.exports.addContent = function(newContent, callback){
    newContent.save(callback);
}

// show dashboard content
module.exports.getContentByUser = function(id, callback){
  const query = {user:id}
  Content.find(query,callback);
}

//show content in edit form 
module.exports.showContent=function(id,callback){
  const query = {_id:id}
  Content.findById(query,callback)
}

//delete user content
module.exports.deleteContent = function(id ,callback){
  
  const query = {_id: id}
  Content.findOneAndRemove(query,callback)
}