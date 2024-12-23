{
  const express = require('express');
  const router = express.Router();
  const teamController = require('../controllers/team.controller');
  const authMiddleware = require('../middlewares/auth.middleware');

  // Handle the /team endpoint
  router.get(
    '/getAllTeams',
    authMiddleware.authenticate,
    teamController.getAllTeams
  );

  // Add more routes for the /team endpoint as needed

  module.exports = router;
}
