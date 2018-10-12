const express = require('express');
const CommunityNotesRouter = express.Router();


CommunityNotesRouter.get('/notes',(req,res)=>{
    res.render('index')
})

module.exports = CommunityNotesRouter;