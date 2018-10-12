const express = require('express');
const CommunityNotesRouter = express.Router();


CommunityNotesRouter.get('/notes', (req, res) => {
   return res.render('index', { data: "Hello world" });
})

module.exports = CommunityNotesRouter;