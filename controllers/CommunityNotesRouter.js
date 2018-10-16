const express = require('express');
const CommunityNotesRouter = express.Router();
const CommunityNoteModel = require('../models/CommunityNoteModel.js');
const CommunityCommentModel = require('../models/CommunityCommentModel.js');


/**
 * Returns a list of all the notes in the Database.
 */

CommunityNotesRouter.get('/notes', (req, res) => {

    try {
        CommunityNoteModel.find({}, (err, models) => {
            if (err) throw err;
            let data = models;
            return res.render('index', { data: data });
        });
    } catch (err) {
        // sends the user a page indicating a server error has occured.
        res.render('error500');
    }

});

/**
 * A route leading to the new notes template/form
 */
CommunityNotesRouter.get('/notes/noteform', (req, res) => {

    try {
        return res.render('newnote');
    }
    catch (err) {
        return res.render('error500')
    }

});


/**
 * A route for creating new notes.
 */
CommunityNotesRouter.post('/notes/noteform/newnote', (req, res) => {

    try {
        // saving community note model to the Databse and then notifying console upon success.
        CommunityNoteModel.create({
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag,
            image_url: req.body.img_url,
        },
            (err, note) => {
                // if the note fails to save an error will be thrown 
                if (err) throw err;
                // redirecting the user via new route instead of another redundant template.
                return res.redirect(`/notes/note/${note._id}`);
            });
    } catch (err) {
        return res.redirect('/notes')
    }

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
        res.redirect(`/notes`)
    }

});


CommunityNotesRouter.post('/notes/comment', (req, res) => {

    /**
     * creates a comment and assciates it with a parent post.
     */

    try {
        if (req.body.comment) {
            CommunityCommentModel.create({
                content: req.body.comment,
                parent_post: req.body.post_id,
            }, (err, comment) => {
                if (err) throw err;
                res.redirect(`/notes/note/${req.body.post_id}`);
            });
        } else {
            res.redirect(`/notes/note/${req.body.post_id}`);
        }

    } catch (err) {
        res.render('error500');
    }


});


module.exports = CommunityNotesRouter;