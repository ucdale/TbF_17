const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Handle the /match endpoint
router.get('/',  authMiddleware.authenticate, matchController.getAllMatches);

// Add more routes for the /match endpoint as needed

module.exports = router;