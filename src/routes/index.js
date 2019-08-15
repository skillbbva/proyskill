const express = require('express');
const router = express.Router();
router.get('/',function(req,res){
    res.render('index.hbs');
});
router.get('/about',function(req,res){
    res.render('about.hbs');
});
module.exports = router;