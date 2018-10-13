const express = require('express');
const CommunityNotesRouter = express.Router();
const CommunityNoteModel = require('../models/CommunityNoteModel.js');


CommunityNotesRouter.get('/notes', (req, res) => {


    CommunityNoteModel.find({}, (err, models) => {
        console.log(models);
        if (err) throw err;
        let data = models;
        return res.render('index', { data: data });
    });

})

CommunityNotesRouter.get('/notes/noteform', (req, res) => {
    return res.render('newnote');
});

CommunityNotesRouter.post('/notes/noteform/newnote', (req, res) => {

    // saving community note model to the Databse and then notifying console upon success.
    CommunityNoteModel.create({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag
    }, (err, note) => {
        if (err) throw err;
        console.log(`${note} was saved`)
    });

    return res.render('note', { note_title: req.body.title, note_content: req.body.content, note_tag: req.body.tag });

});

module.exports = CommunityNotesRouter;