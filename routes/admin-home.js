const express = require('express');
const Catogory = require('../model/admin-home');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('admin-home');
});
router.post('/add', async(req, res, next)=> {
    let newCatogory = new Catogory({
        Catogory:req.body.Catogory
    });

    Catogory.addCatogory(newCatogory,(err,Catogory) =>{
        if(err){
            console.log(err);
            res.json({success:false, msg:'failed to added'});
        }else {
            res.json({success:true, msg:'successfully added'});
        }
        console.log(res);
    });

});

module.exports = router;