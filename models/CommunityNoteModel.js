const mongoose = require('mongoose');

const CommunityNoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    tag: String,
    date_published: {
        type: Date,
        default: Date.now
    }
});

const CommunityNoteModel = mongoose.model('CommunityNote', CommunityNoteSchema);

module.exports = CommunityNoteModel;