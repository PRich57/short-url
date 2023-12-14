const express = require('express');
const urlController = require('../controllers/urlController');
const router = express.Router();

// Route for creating a shortened URL
router.post('/shorten', urlController.shortenUrl);

// Route for redirecting a shortened URL to its original URL
router.get('/:shortId', urlController.redirectToOriginalUrl);

module.exports = router;