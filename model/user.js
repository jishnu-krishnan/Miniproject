const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');


// USers Schemma
const UserSchema = mongoose.Schema({
    mail:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByID = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByMail = function(mail, callback){
    const query = {mail: mail}
    User.findOne(query, callback);
}



/* module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            console.log(bcrypt.hash(newUser.password, salt, (err, hash)))
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
} */

module.exports.addUser = async function(newUser, callback){
    const salt = await bcrypt.genSaltSync(10)
    
    newUser.password = await bcrypt.hashSync(newUser.password,salt)

    newUser.save(callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};