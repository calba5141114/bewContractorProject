const mongoose = require('mongoose');

const CommunityNoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    tag: String,
    image_url:{
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