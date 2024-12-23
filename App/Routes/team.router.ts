import express from 'express';
import TeamController from '../Controllers/team.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = express.Router();

router.get('/getAllTeams', authenticate, TeamController.getAllTeams);
router.post('/createTeam', authenticate, TeamController.createTeam);

export default router;
