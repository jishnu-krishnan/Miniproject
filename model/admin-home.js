const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
    {
        Catogory: {
            type: String,
            required: true,
            trim: true,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
          },
    }
);
const Catogory = module.exports = mongoose.model('Catogory', adminSchema);

module.exports.addCatogory = function(newCatogory, callback){
    newCatogory.save(callback);
}
