{
  const express = require('express');
  const router = express.Router();
  const playerController = require('../controllers/player.controller');
  const authMiddleware = require('../middlewares/auth.middleware');

  // Handle the /player endpoint
  router.get(
    '/getAllPlayers',
    authMiddleware.authenticate,
    playerController.getAllPlayers
  );

  // Add more routes for the /player endpoint as needed

  module.exports = router;
}
