const express = require('express');
const DefaultRouter = express.Router();


DefaultRouter.get('/',(req,res)=>{
    res.send({mesg: "hello world"});
});



module.exports = DefaultRouter;