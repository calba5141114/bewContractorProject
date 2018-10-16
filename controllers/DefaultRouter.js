const express = require('express');
const DefaultRouter = express.Router();

/**
 * index.js main route.
 */
DefaultRouter.get('/', (req, res) => {
    res.redirect('/notes');
});

module.exports = DefaultRouter;