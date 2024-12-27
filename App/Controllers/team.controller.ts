import { Request, Response } from 'express';
import nano from 'nano';

import { v4 as uuidv4 } from 'uuid';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class TeamController {
  static async getAllTeams(req: Request, res: Response): Promise<void> {
    try {
      const response = await db.find({ selector: { type: 'team' } });
      const teams = response.docs.map((doc: any) => ({
        _id: doc._id,
        ...doc.team
      }));
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching teams' });
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
              id: strikerPlayer._id,
              name: strikerPlayer.name
            },
            {
              position: 'defender',
              id: defenderPlayer._id,
              name: defenderPlayer.name
            }
          ]
        }
      };

      const response = await db.insert(teamDoc);
      res.json({ success: response.ok, _id: response.id, ...teamDoc.team });
    } catch (error) {
      res.status(500).json({ error: 'Error creating team' });
    }
  }

  static async updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, strikerPlayer, defenderPlayer } = req.body;

      // sotto si può usare db.head per avere solo l'header del documento (con il rev)
      const teamDoc = (await db.get(id)) as any; // TODO da mettere il type corretto per team

      teamDoc.team.name = name;

      let newStriker = {
        position: 'striker',
        id: strikerPlayer._id,
        name: strikerPlayer.name
      };

      let newDefender = {
        position: 'defender',
        id: defenderPlayer._id,
        name: defenderPlayer.name
      };

      teamDoc.team.players = [newStriker, newDefender];

      const response = await db.insert({
        ...teamDoc,
        _rev: teamDoc._rev // Include the _rev to update the existing document
      });
      res.json({ success: response.ok, _id: response.id, ...teamDoc.team });
    } catch (error) {
      res.status(500).json({ error: 'Error updating team name' });
    }
  }

  static async deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      // Fetch the existing team document to get the _rev
      const teamDoc = await db.get(id);

      // Delete the document using the id and _rev
      const response = await db.destroy(id, teamDoc._rev);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting team' });
    }
  }
}

export default TeamController;
