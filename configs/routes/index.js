const express = require('express');
const router = express.Router();
// Landing route
    router.get('/',(req,res)=>{
    res.render('landing');
});
module.exports = router;