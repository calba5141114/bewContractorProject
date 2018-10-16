const mongoose = require('mongoose');


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
