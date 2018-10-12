const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.js');
const pug = require('pug');
const path = require('path');

/**
 * configurations for the app
 */
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "pug")

// scss styling and js code.
app.use(express.static(path.join(__dirname, "public")))

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
    console.log(`Application running on ${config.port}`)
});