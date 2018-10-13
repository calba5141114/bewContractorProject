const mongoose = require('mongoose');
const CommunityCommentModel = require('./CommunityCommentModel.js');

const CommunityNoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    tag: String,
    image_url: {
        type: String,
        default: ""
    },
    comments: {
        type: Array,
        default: []
    },
    date_published: {
        type: Date,
        default: Date.now
    }
});

const CommunityNoteModel = mongoose.model('CommunityNote', CommunityNoteSchema);

module.exports = CommunityNoteModel;