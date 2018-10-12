const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.js');
const nunjucks = require('nunjucks');

/**
 * Importing modules containing my routes and controllers
 */
const DefaultRouter = require('./controllers/DefaultRouter.js');
const CommunityNotesRouter = require('./controllers/CommunityNotesRouter.js');

app.use('/', DefaultRouter);
// notes router
app.use('/', CommunityNotesRouter);

try {
    mongoose.connect(config.mongoDBURI, { useNewUrlParser: true });
}
catch (err) {
    throw err;
}

app.listen(config.port, () => {
    console.log(`Applicstion running on ${config.port}`)
});