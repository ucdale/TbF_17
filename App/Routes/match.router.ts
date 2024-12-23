import express from 'express';
import MatchController from '../Controllers/match.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = express.Router();

router.get('/getAllMatches', authenticate, MatchController.getAllMatches);
router.post('/createMatch', authenticate, MatchController.createMatch);

export default router;
