const express = require('express');
const CommunityNotesRouter = express.Router();


CommunityNotesRouter.get('/notes', (req, res) => {
    return res.render('index', { data: "Hello world" });
})

CommunityNotesRouter.get('/notes/noteform', (req, res) => {
    return res.render('newnote');
});

CommunityNotesRouter.post('/notes/noteform/newnote', (req, res) => {
    console.log(req.body);
    return res.render('note', { note_title: req.body.title, note_content: req.body.content });
});

module.exports = CommunityNotesRouter;