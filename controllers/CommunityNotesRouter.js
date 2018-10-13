const express = require('express');
const CommunityNotesRouter = express.Router();
const CommunityNoteModel = require('../models/CommunityNoteModel.js');

/**
 * Returns a list of all the notes in the Database.
 */

CommunityNotesRouter.get('/notes', (req, res) => {

    CommunityNoteModel.find({}, (err, models) => {
        if (err) throw err;
        let data = models;
        return res.render('index', { data: data });
    });

})

/**
 * A route leading to the new notes template/form
 */
CommunityNotesRouter.get('/notes/noteform', (req, res) => {
    return res.render('newnote');
});


/**
 * A route for creating new notes.
 */
CommunityNotesRouter.post('/notes/noteform/newnote', (req, res) => {

    // saving community note model to the Databse and then notifying console upon success.
    CommunityNoteModel.create({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        image_url: req.body.img_url
    }, (err, note) => {
        if (err) throw err;
        console.log(`${note} was saved`)
    });

    return res.render('note', { note_title: req.body.title, note_content: req.body.content, note_tag: req.body.tag });

});

/**
 * Get request for a single note it should return all the data you need to work with everything
 */
CommunityNotesRouter.get('/notes/note/:id', (req, res) => {
    let id = req.params.id;
    CommunityNoteModel.findById(id, (err, model) => {
        if (err) console.log(err);
        // passing model to PUG template.
        let data = model;
        res.render('single-note-view', { data });
    });
});



module.exports = CommunityNotesRouter;