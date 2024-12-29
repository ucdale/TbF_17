import express from 'express';
import MatchController from '../Controllers/match.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = express.Router();

router.get('/getAllMatches', authenticate, MatchController.getAllMatches);
router.post('/createMatch', authenticate, MatchController.createMatch);
router.post('/endMatch', authenticate, MatchController.endMatch);
router.post(
  '/updateMatchScore',
  authenticate,
  MatchController.updateMatchScore
);
router.post('/deleteMatch', authenticate, MatchController.deleteMatch);

export default router;
