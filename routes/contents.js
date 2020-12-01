const express = require('express');
const content = require('../model/content');
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
        createrdAt: req.body.createrdAt
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

 // @desc show content in editing form
// @ route GET /content/add/:id
router.get('/add/:id',(req,res,next)=>{
    Content.showContent(req.params.id,(err,content)=>{
        //if(err) throw err;
        if (!content){
            return res.json({ success:false,msg:'No content found'});
        }else{
            return res.json(content)
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
        if (error){
            console.log(error)
            return next(error);
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

module.exports = router;