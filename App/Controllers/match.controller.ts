// class MatchController {
//   static getAllMatches(req, res) {
//     // Fetch matches data from your database or any other source
//     const matches = [
//       // esempio di dati
//       {
//         teamRed: {
//           name: 'Ragind Bulls',
//           players: [
//             { type: 'striker', name: 'pippo', goals: 0, blocks: 2 },
//             { type: 'defender', name: 'pluto', goals: 0, blocks: 1 }
//           ],
//           score: 0
//         },
//         teamBlue: {
//           name: 'Quacking Ducks',
//           players: [
//             { type: 'striker', name: 'paperino', goals: 1, blocks: 2 },
//             { type: 'defender', name: 'gastone', goals: 0, blocks: 1 }
//           ],
//           score: 1
//         },
//         status: 'ongoing',
//         date: new Date()
//       },
//       {
//         teamRed: {
//           name: 'Ragind Bulls',
//           players: [
//             { type: 'striker', name: 'pippo', goals: 0, blocks: 2 },
//             { type: 'defender', name: 'pluto', goals: 0, blocks: 1 }
//           ],
//           score: 8
//         },
//         teamBlue: {
//           name: 'Quacking Ducks',
//           players: [
//             { type: 'striker', name: 'paperino', goals: 1, blocks: 2 },
//             { type: 'defender', name: 'gastone', goals: 0, blocks: 1 }
//           ],
//           score: 4
//         },
//         status: 'completed',
//         date: new Date(new Date().setDate(new Date().getDate() - 1))
//       }
//     ];

//     res.json({ matches });
//   }

//   // Add more methods for handling match-related functionality
// }

// module.exports = MatchController;

import { Request, Response } from 'express';
import nano from 'nano';
import { v4 as uuidv4 } from 'uuid';
import { isMatchType, MatchType } from '../Models/Match';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class MatchController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    try {
      const response = await db.find({ selector: { type: 'match' } });
      const matches = response.docs.map((doc: any) => ({
        _id: doc._id,
        ...doc.match
      }));
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching matches' });
    }
  }

  static async createMatch(req: Request, res: Response): Promise<void> {
    try {
      const { redTeam, blueTeam } = req.body;

      const initializedRedTeam = {
        ...redTeam,
        score: 0
      };

      const initializedBlueTeam = {
        ...blueTeam,
        score: 0
      };

      const matchDate = new Date().toISOString();

      const matchDoc = {
        _id: `${redTeam.name}_${blueTeam.name}_${matchDate}`,
        type: 'match',
        match: {
          teamRed: initializedRedTeam,
          teamBlue: initializedBlueTeam,
          status: 'ongoing',
          date: matchDate
        }
      };

      const response = await db.insert(matchDoc);
      res.json({ success: response.ok, _id: response.id, ...matchDoc });
    } catch (error) {
      res.status(500).json({ error: 'Error creating match' });
    }
  }

  static async endMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      const matchDoc = await db.get(id);

      if (!isMatchType(matchDoc)) {
        res.status(400).json({ error: 'Invalid match document' });
        return;
      }

      // Modifica il campo status del match a 'completed'
      matchDoc.match.status = 'completed';

      // Aggiorna il documento nel database
      const response = await db.insert(matchDoc);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: 'Error ending match' });
    }
  }

  static async deleteMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      console.log('>>>>>>>>>>>>>>>>>>>', id);

      const matchDoc = await db.get(id);

      console.log('>>>>>>>>>>>>>>>>>>>', matchDoc._rev);

      const response = await db.destroy(id, matchDoc._rev);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting match' });
    }
  }
}

export default MatchController;
