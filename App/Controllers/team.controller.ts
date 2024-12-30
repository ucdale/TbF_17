import { Request, Response } from 'express';
import {
  allTeams,
  searchTeamsByName,
  teamById
} from '../DataSources/team.dataSource';
import { v4 as uuidv4 } from 'uuid';
import { PlayerInTeamType } from '../Models/Team';
import couchDbConnection from '../couchDbConnection';

const couch = couchDbConnection;
const db = couch.db.use('tbf17');

class TeamController {
  static async getAllTeams(req: Request, res: Response): Promise<void> {
    try {
      const teams = await allTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error fetching teams' });
    }
  }

  static async getAllEligibleTeamsByName(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { term, excludeName } = req.query;

      let selector;

      if (term !== '' || term !== null) {
        selector = {
          type: 'team',
          'team.name': { $regex: term ? `(?i)${term}` : '' }
        };
      } else {
        selector = {
          type: 'team'
        };
      }

      if (excludeName) {
        selector['team.name'].$ne = excludeName;
      }

      const teams = await searchTeamsByName(
        term as string,
        excludeName as string
      );

      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error fetching teams' });
    }
  }

  static async createTeam(req: Request, res: Response): Promise<void> {
    try {
      const { name, strikerPlayer, defenderPlayer } = req.body;

      const teamDoc = {
        _id: uuidv4(),
        type: 'team',
        team: {
          name,
          players: [
            {
              position: 'striker',
              _id: strikerPlayer._id,
              name: strikerPlayer.name
            },
            {
              position: 'defender',
              _id: defenderPlayer._id,
              name: defenderPlayer.name
            }
          ]
        }
      };

      const response = await db.insert(teamDoc);
      res.json({ success: response.ok, _id: response.id, ...teamDoc.team });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error creating team' });
    }
  }

  static async updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, strikerPlayer, defenderPlayer } = req.body;

      // sotto si può usare db.head per avere solo l'header del documento (con il rev)
      const teamDoc = await teamById(id);

      teamDoc.team.name = name;

      let newStriker: PlayerInTeamType = {
        position: 'striker',
        _id: strikerPlayer._id,
        name: strikerPlayer.name,
        goals: 0,
        blocks: 0
      };

      let newDefender: PlayerInTeamType = {
        position: 'defender',
        _id: defenderPlayer._id,
        name: defenderPlayer.name,
        goals: 0,
        blocks: 0
      };

      teamDoc.team.players = [newStriker, newDefender];

      const response = await db.insert({
        ...teamDoc,
        _rev: teamDoc._rev // Include the _rev to update the existing document
      });
      res.json({ success: response.ok, _id: response.id, ...teamDoc.team });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error updating team name' });
    }
  }

  static async deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      const teamDoc = await teamById(id);

      // Delete the document using the id and _rev
      const response = await db.destroy(id, teamDoc._rev);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error deleting team' });
    }
  }
}

export default TeamController;
