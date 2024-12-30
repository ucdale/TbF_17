import { Request, Response } from 'express';
import MatchController from '../Controllers/match.controller';
import { allMatches } from '../DataSources/match.dataSource';
import { allTeams } from '../DataSources/team.dataSource';

jest.mock('../DataSources/match.dataSource');
jest.mock('../DataSources/team.dataSource');

describe('MatchController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  describe('getAllMatches', () => {
    it('should return all matches', async () => {
      const mockMatches = [
        { id: 1, name: 'Match 1' },
        { id: 2, name: 'Match 2' }
      ];
      (allMatches as jest.Mock).mockResolvedValue(mockMatches);

      await MatchController.getAllMatches(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockMatches);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error fetching matches';
      (allMatches as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await MatchController.getAllMatches(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getWinnersOfMatches', () => {
    it('should return winners of matches', async () => {
      const mockMatches = [
        { id: 1, winner: 'Team A' },
        { id: 2, winner: 'Team B' },
        { id: 3, winner: 'Team A' }
      ];
      const mockTeams = [
        { name: 'Team A' },
        { name: 'Team B' },
        { name: 'Team C' }
      ];
      (allMatches as jest.Mock).mockResolvedValue(mockMatches);
      (allTeams as jest.Mock).mockResolvedValue(mockTeams);

      await MatchController.getWinnersOfMatches(
        req as Request,
        res as Response
      );

      expect(res.json).toHaveBeenCalledWith([
        { name: 'Team A', wins: 2 },
        { name: 'Team B', wins: 1 },
        { name: 'Team C', wins: 0 }
      ]);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error fetching matches';
      (allMatches as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await MatchController.getWinnersOfMatches(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
