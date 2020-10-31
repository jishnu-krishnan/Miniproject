const express = require('express');
const bookmark = require('../model/bookmark');
const router = express.Router();
const Bookmark = require('../model/bookmark');

require('dotenv').config();

router.get('/', (req, res, next) => {
    res.send('bookmark home');
});

// @desc    Create New bookmark
// @route   POST /bookmark/add
router.post('/add', async (req, res, next) => {
    //id=localStorage.getItem('user',id)
    //console.log(id)
    let newBookmark =new Bookmark({
        
        link: req.body.link,
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        user: req.body.user,
        createrdAt: req.body.createrdAt
    });
    Bookmark.addBookmark(newBookmark,(err, bookmark) =>{
        if(err){
            console.log(err);
            res.json({success:false, msg:'failed to new bookmark'});
        } else {
            res.json({success:true, msg:'successfully added'});
        }
    });
});




module.exports = router;