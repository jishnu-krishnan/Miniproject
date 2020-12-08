const express = require('express');
const Bookmark = require('../model/bookmark');
const router = express.Router();
//const Bookmark = require('../model/bookmark');
const localStorage = require('node-localstorage');
const bookmark = require('../model/bookmark');
const UrlMetadata= require('url-metadata')

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

/* 
// @desc show Bookmark in editing form
// @ route GET /bookmark/add/:id
router.get('/add/:id',(req,res,next)=>{
    Bookmark.showBookmark(req.params.id,(err,bookmark)=>{
        //if(err) throw err;
        if (!bookmark){
            return res.json({ success:false,msg:'No content found'});
        }else{
            return res.status(200).json(bookmark)
        }
    })
}) 
 */
// @desc get description of site
// @route PUT /bookmark/get
router.put('/get',(req,res,next)=>{
    console.log(req.body.link,'jm')
const li=req.body.link
    //https://beebom.com/best-bookmark-managers/
    UrlMetadata(li).then(
        function (metadata) { // success handler
          console.log(metadata)
          return res.json(metadata)
        },
        function (error) { // failure handler
          console.log(error)
          //return res.json({success: false, msg:'No Meta description found'})

        })
})

// @desc show search bookmark
// @route PUT /bookmark/search/:id
router.put('/search/:id',(req,res,next)=>{
    const title = req.body.body;
    Bookmark.searchBookmark(req.params.id,title,(error,bookmark)=>{
        if (!bookmark){
            return error
        }else {
            return res.status(200).json(bookmark)
        }
    })

})

// @desc show bookmark in dashboard
// @route GET /bookmark/dashboard/:id
router.get('/dashboard/:id',(req,res,next)=> {

    //localStorage.getItem
    //const user= JSON.parse(localStorage.getItem('user'))
    Bookmark.getBookmarkByUser(req.params.id,(err, bookmark)=> {
        if(err) throw err;
        if(!bookmark){
            return res.json({success: false, msg:'No bookmark found'})
        }else {
            return res.json(bookmark)
        }
    })
    //res.json({user:req.user});
    
})

// @desc delete bookmark
// @route DELETE /bookmark/delete/:id
router.delete('/delete/:id',(req,res,next) => {
    //console.log(req.params.id)
    Bookmark.deleteBookmark(req.params.id,(err,bookmark)=>{

        if(err) throw err;
        if(!bookmark){
            return res.json({success:false, msg:'No bookmark found'})
        } else {
            return res.status(200).json({success:true, msg:'Bookmark deleted'})
        }
    })
});

// @desc Show bookmark in edit form
// @route GET /bookmark/add/:id
router.get('/add/:id',(req,res,next)=>{
    Bookmark.showBookmark(req.params.id,(err,bookmark)=>{
        if(err) throw err;
        if(!bookmark){
            return res.json({success:false,msg:'No bookmark found'});
        } else {
            return res.json(bookmark)
        }
    })
})

// @desc show bookmark in dashboard
// @route GET /bookmark/discover/

router.get('/discover',(req,res,next)=> {
    
    Bookmark.getPublicBookmark((err, bookmark)=> {
        if(err) throw err;
        if(!bookmark){
            return res.json({success: false, msg:'No content found'})
        }else {
            return res.status(200).json(bookmark)
        }
    })
    //res.json({user:req.user});
    
})

// @desc edit bookmark
// @route PUT /bookmark/add/:id
router.put('/add/:id',(req,res,next)=>{
    /* let editBookmark =new Bookmark({
        _id:req.body.id,
        link: req.body.link,
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        user: req.body.user,
        createrdAt: req.body.createrdAt
    }); */
    Bookmark.findByIdAndUpdate(req.params.id,{$set: req.body},(error,data)=>{
        if(error){
            console.log(error)
            return next(error);
        }else{
            return res.json({success:true,msg:'successfully edited'})
        }
    })

    /* Bookmark.editBookmark(req.params.id,newBookmark,(err,bookmark)=>{
        if(err) throw err;
        if(!bookmark){
            return res.json({success:false,msg:'No bookmark found'});
        } else {
            return res.json({success:true,msg:'successfully edited'})
        }
    }) */
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