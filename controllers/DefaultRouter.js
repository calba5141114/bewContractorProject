const express = require('express');
const DefaultRouter = express.Router();


/**
 * index.js main route.
 */
DefaultRouter.get('/',(req,res)=>{
    res.send({mesg: "hello world"});
});



module.exports = DefaultRouter;