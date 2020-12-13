const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Content',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const Comment= module.exports= mongoose.model('Comment',CommentSchema)

module.exports.addComment = function(newComment, callback){
    newComment.save(callback)
}

module.exports.getComments = function(id ,callback){
    const query = {content:id}
    Comment.find(query, callback).populate('user').sort({createdAt:'desc'});
}