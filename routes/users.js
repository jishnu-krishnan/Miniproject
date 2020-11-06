const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../model/user');

require('dotenv').config();
const secret = process.env.JWT_KEY;
//console.log(secret);

// Home
router.get('/', (req, res, next) => {
    res.send('Home');
});

// Register
router.all('/register', function(req, res, next) {
    let newUser = new User({
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'Failed to register user'});   
        }else {
            res.json({success: true, msg:'User registered'});   
        }
    });

});


// Authenticate
router.all('/authenticate', (req, res, next) => {
    const mail =req.body.mail;
    const password = req.body.password;

    User.getUserByMail(mail, (err, user)=> {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

    User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
            //console.log(user);
            const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                expiresIn: 604800 // one week
            });
            
            res.json({
                success: true, token: 'JWT '+token,
                user:{
                    id: user._id,
                    name: user.name,
                    mail: user.mail
                }
            });
        }else{
            return res.json({success: false, msg: 'Wrong Password'});
        }
    });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user:req.user});
});

module.exports = router;