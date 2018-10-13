const mongoose = require('mongoose');


const CommunityCommentSchema = new mongoose.Schema({
    content: String,
    parent_post: {
        type: String,
        default: ""
    }
});

const CommunityCommentModel = mongoose.model('CommunityComment', CommunityCommentSchema);

module.exports = CommunityCommentModel;
