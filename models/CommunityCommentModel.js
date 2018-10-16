const mongoose = require('mongoose');



/**
 * The comment piece is a simple model that holds content
 * and a reference to the Note that it was posted to the DB from.
 * date_published gives a scope to the user of when a comment occured.
 */

const CommunityCommentSchema = new mongoose.Schema({
    content: String,
    parent_post: {
        type: String,
        default: ""
    },
    date_published: {
        type: Date,
        default: Date.now
    }
});

const CommunityCommentModel = mongoose.model('CommunityComment', CommunityCommentSchema);

module.exports = CommunityCommentModel;
