const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.js');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');

// connecting to the DB before anything
mongoose.connect(config.mongoDBURI, { useNewUrlParser: true })
    .then(() => {
        console.log(`Connected to ${config.mongoDBURI}`)
    })
    .catch(err => {
        console.log(err);
    })

/**
 * configurations for the app
 */
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "pug")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
// 404 route
app.get('*', (req, res) => {
    res.render('error404');
});

app.listen(config.port, () => {
    console.log(`Application running on ${config.port}`)
});