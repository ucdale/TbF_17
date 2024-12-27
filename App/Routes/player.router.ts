import express from 'express';
import PlayerController from '../Controllers/player.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = express.Router();

router.get('/getAllPlayers', authenticate, PlayerController.getAllPlayers);
router.post('/createPlayer', authenticate, PlayerController.createPlayer);
router.post(
  '/updatePlayerName',
  authenticate,
  PlayerController.updatePlayerName
);
router.post('/deletePlayer', authenticate, PlayerController.deletePlayer);

export default router;
