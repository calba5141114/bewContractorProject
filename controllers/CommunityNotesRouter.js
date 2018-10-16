const express = require('express');
const CommunityNotesRouter = express.Router();
const CommunityNoteModel = require('../models/CommunityNoteModel.js');
const CommunityCommentModel = require('../models/CommunityCommentModel.js');

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


    try {

        // get post data
        CommunityNoteModel.findById(req.params.id, (err, model) => {
            if (err) console.log(err);
            return data = model;
        });


        // getting comments and sending them to the page
        CommunityCommentModel.find({ parent_post: req.params.id }, (err, data) => {
            if (err) throw err;
            return comments = data;
        });

        return res.render('single-note-view', { data, comments });

    }
    catch (err) {
        res.redirect(`/notes/note/${req.params.id}`)
    }

});


CommunityNotesRouter.post('/notes/comment', (req, res) => {
    console.log(req.body);
    /**
     * creates a comment and assciates it with a parent post.
     */

    if (req.body.comment) {
        CommunityCommentModel.create({
            content: req.body.comment,
            parent_post: req.body.post_id,
        }, (err, comment) => {
            if (err) throw err;
            res.redirect(`/notes/note/${req.body.post_id}`);
        });
    }
    else {
        res.redirect(`/notes/note/${req.body.post_id}`);
    }

});


module.exports = CommunityNotesRouter;