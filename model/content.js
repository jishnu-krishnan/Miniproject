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

 module.exports = mongoose.model('Content', ContentSchema)

module.exports.addContent = function(newContent, callback){
    newContent.save(callback);
}