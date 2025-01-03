import express from 'express';
import TeamController from '../Controllers/team.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = express.Router();

router.get('/getAllTeams', authenticate, TeamController.getAllTeams);
router.get(
  '/getAllEligibleTeamsByName',
  authenticate,
  TeamController.getAllEligibleTeamsByName
);
router.post('/createTeam', authenticate, TeamController.createTeam);
router.post('/updateTeam', authenticate, TeamController.updateTeam);
router.post('/deleteTeam', authenticate, TeamController.deleteTeam);

export default router;
