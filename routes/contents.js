const express = require('express');
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


module.exports = router;