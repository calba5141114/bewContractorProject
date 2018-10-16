const mongoose = require('mongoose');

/**
 * This Schema takes a title to  display to the end user
 * content for the end user
 * a single tag for use in allowing other users to get a grasp of the text content
 * image_url is a hotlink to an image
 * date_published is important to the end user.
 */

const CommunityNoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    tag: String,
    image_url: {
        type: String,
        default: ""
    },
    date_published: {
        type: Date,
        default: Date.now
    }
});

const CommunityNoteModel = mongoose.model('CommunityNote', CommunityNoteSchema);

module.exports = CommunityNoteModel;

/**
 * The Comment Model is located in models/CommunityCommentModel.js
 * and has a field to associate with it's parent post Model.
 */