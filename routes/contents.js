const express = require('express');
const bookmark = require('../model/bookmark');
const Bookmark = require('../model/bookmark');
const comment = require('../model/comment');
const Comment = require('../model/comment');
const Content = require('../model/content');
const router = express.Router();

// @desc content home page
// @route POST /content
router.get('/', (req, res, next) => {
    res.send('content home');
});

// @desc Create New content
// @route POST /content/add
router.post('/add', async(req, res, next)=> {
    let newContent = new Content({
        title:req.body.title,
        body: req.body.body,
        status: req.body.status,
        user: req.body.user,
        createrdAt: req.body.createrdAt,
        reason:req.body.reason
    });

    Content.addContent(newContent,(err,content) =>{
        if(err){
            console.log(err);
            res.json({success:false, msg:'failed to added'});
        }else {
            res.json({success:true, msg:'successfully added'});
        }
    });
});


// @desc add comment in publish content
// @route POST /content/comment
router.post('/comment',(req,res,next)=>{
    let newComment = new Comment({
        comment:req.body.comment,
        user:req.body.user,
        content:req.body.content,
        createrdAt:req.body.createrdAt
    });

    Comment.addComment(newComment,(err,comment)=>{
        if(err){
            console.log(err);
            res.json({success:false, msg:'Failed to comment'});
        } else {
            res.json({success:true, msg:'Comment successfully added'})
        }
    });
});

 // @desc show content in editing form
// @ route GET /content/add/:id
router.get('/add/:id',(req,res,next)=>{
    Content.showContent(req.params.id,(err,content)=>{
        //if(err) throw err;
        if (!content){
            Bookmark.findById(req.params.id,(err,bookmark)=>{
                if(!bookmark){
                    return res.json({ success:false,msg:'No content found'});
                }else{
                    return res.status(200).json(bookmark)
                }
            })
        }else{
            return res.status(200).json(content)
        }
    })
}) 


// @desc edit content in editing form
// @ route PUT /content/add/:id
router.put('/add/:id',(req,res,next)=>{
    Content.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
        if(error){
            console.log(error)
            return next(error);
        }else{
            return res.json({success:true,msg:'successfully edited'})
        }
    })
})


// @desc Request to publish
// @ route PUT /content/request/:id
router.put('/request/:id',(req,res,next)=>{
    Content.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
        if (!content){
            Bookmark.findByIdAndUpdate(req.params.id,{$set: req.body},(error,bookmark)=>{
                if(!bookmark){
                    return res.json({success:false ,msg:'Not found id'})
                }else{
                    return res.json({success:true,msg:'successfully edited'})
                }
            })
        }else{
            return res.json({success:true,msg:'successfully edited'})

        }
    })
})



// @desc show content in dashboard
// @route GET /content/dashboard/:id
router.get('/dashboard/:id',(req,res,next)=> {

    //localStorage.getItem
    //const user= JSON.parse(localStorage.getItem('user'))
    Content.getContentByUser(req.params.id,(err, content)=> {
        if(err) throw err;
        if(!content){
            return res.json({success: false, msg:'No content found'})
        }else {
            return res.status(200).json(content)
        }
    })
    //res.json({user:req.user});
    
})

// @desc show content for particular user
// @route GET /content/user/:id
router.get('/user/:id',(req,res,next)=> {

    Content.getUserContent(req.params.id,(err, content)=> {
        if(err) throw err;
        if(!content){
            console.log(err)
            return res.json({success: false, msg:'No content found'})
        }else {
            return res.status(200).json(content)
        }
    })
    
})


// @desc show content in dashboard
// @route GET /content/discover/:id
router.get('/discover',(req,res,next)=> {
    
    Content.getPublicContent((err, content)=> {
        if(err) throw err;
        if(!content){
            return res.json({success: false, msg:'No content found'})
        }else {
            return res.status(200).json(content)
        }
    })
    //res.json({user:req.user});
    
})

//@desc delete content
// @route DELETE /content/delete/:id
router.delete('/delete/:id',(req,res,next) => {
    //console.log(req.params.id)
    Content.deleteContent(req.params.id,(err,content)=>{

        if(err) throw err;
        if(!content){
            return res.json({success:false, msg:'No content found'});
        } else {
            return res.status(200).json(content)
        }
    })
});


// @desc show search result
// @route PUT /content/search
/* router.put('/search',(req,res,next)=>{
    //console.log(req.body)
    const title=req.body.body;
    //console.log(title)
    Content.searchContent(title,(error,content)=>{
        if(!content){
            //console.log('hgbj')
            return error
        }else {
            //console.log(content)
            return res.status(200).json(content)
        }
    })
}) */

router.put('/search',(req,res,next)=>{
    //console.log(req.body)
    const title=req.body.body;
    const user=req.body.user;
    //console.log(title)
    Content.find({body : {"$regex": new RegExp(title)}},{_id:0,_v:0},(error,content)=>{
        if(!content){
            console.log('hgbj')
            return error
        }else {
            
            return res.status(200).json(content)
        } 
    })
})

// @desc view comments
// @route GET /content/view/comment/:id
router.get('/view/comment/:id',(req,res,next)=>{
    Comment.getComments(req.params.id,(err,comment)=>{
        if(!comment){
            return res.json({success:false, msg:' Not found'})
        } else {
            return res.json(comment)
        }
    })
    })

module.exports = router;