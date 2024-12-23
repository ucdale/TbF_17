// class TeamController {
//   static getAllTeams(req, res) {
//     // Fetch teams data from your database or any other source
//     const teams = [
//       // esempio di dati
//       {
//         name: 'Ragind Bulls',
//         players: [
//           { type: 'striker', name: 'pippo' },
//           { type: 'defender', name: 'pluto' }
//         ]
//       },
//       {
//         name: 'Quacking Ducks',
//         players: [
//           { type: 'striker', name: 'paperino' },
//           { type: 'defender', name: 'gastone' }
//         ]
//       }
//     ];

//     res.json({ teams });
//   }
// }

// module.exports = TeamController;

import { Request, Response } from 'express';
import nano from 'nano';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class TeamController {
  static async getAllTeams(req: Request, res: Response): Promise<void> {
    try {
      const response = await db.find({ selector: { type: 'team' } });
      const teams = response.docs.map((doc: any) => doc.team);
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching teams' });
    }
  }

  static async createTeam(req: Request, res: Response): Promise<void> {
    try {
      const team = req.body;
      team.type = 'team';
      const response = await db.insert(team);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error creating team' });
    }
  }
}

export default TeamController;
