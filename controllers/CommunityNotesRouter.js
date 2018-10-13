const express = require('express');
const CommunityNotesRouter = express.Router();


CommunityNotesRouter.get('/notes', (req, res) => {
   return res.render('index', { data: "Hello world" });
})

CommunityNotesRouter.get('/notes/noteform',(req,res)=>{
    return res.render('newnote');
});

CommunityNotesRouter.post('/notes/noteform/newnote',(req,res)=>{
    console.log(req.query.title)
    return res.render('note',{ note_data: req.query.title });
});

module.exports = CommunityNotesRouter;