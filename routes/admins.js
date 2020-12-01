const express = require('express');
const router = express.Router();
const Content = require('../model/content');
const Bookmark = require('../model/bookmark');

require('dotenv').config();

router.get('/',(req,res,next)=>{
    res.send('admin home')
});


// @desc view requests
// @route GET /admin/request
router.get('/request',(req,res,next)=>{
    Content.showRequest((err,content)=>{
        if(!content){
            return res.json({success: false, msg:'No request found'})
        }else {
            return res.json(content)
        }
    })
});

// @desc Approve to publish
// @ route PUT /admin/approve/:id
router.put('/approve/:id',(req,res,next)=>{
    Content.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
        if (error){
            console.log(error)
            return next(error);
        }else{
            return res.json({success:true,msg:'successfully edited'})

        }
    })
})

// @desc Reject to publish
// @ route PUT /admin/reject/:id
router.put('/reject/:id',(req,res,next)=>{
    Content.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
        if (error){
            console.log(error)
            return next(error);
        }else{
            return res.json({success:true,msg:'successfully edited'})

        }
    })
})

// @desc Reject to publish
// @ route PUT /admin/rejectbookmark/:id
router.put('/rejectbookmark/:id',(req,res,next)=>{
    Bookmark.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
        if (error){
            console.log(error)
            return next(error);
        }else{
            return res.json({success:true,msg:'successfully edited'})

        }
    })
})


module.exports = router;