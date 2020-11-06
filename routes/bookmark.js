const express = require('express');
const Bookmark = require('../model/bookmark');
const router = express.Router();
//const Bookmark = require('../model/bookmark');
const localStorage = require('node-localstorage')


//localStorage = new LocalStorage('./scratch')

var isNode = typeof module !== 'undefined'
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
            res.json({success:false, msg:'failed to added'});
        } else {
            res.json({success:true, msg:'successfully added'});
        }
    });
});

router.get('/dashboard/:id',(req,res,next)=> {

    //localStorage.getItem
    //const user= JSON.parse(localStorage.getItem('user'))
    Bookmark.getBookmarkByUser(req.params.id,(err, bookmark)=> {
        if(err) throw err;
        if(!bookmark){
            return res.json({success: false, msg:'No bookmark added'})
        }else {
            return res.json(bookmark)
        }
    })
    //res.json({user:req.user});
    
})
/* Bookmark.getBookmarkByUser(bookmark,(err,bookmark)=> {
    if(err){
        console.log(err);
        res.json({success:false, msg:'loading failed'});
    } else {
        res.json({success:true, msg:'success'});
    }
}); */

module.exports = router;