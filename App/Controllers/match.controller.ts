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

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class MatchController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    try {
      const response = await db.find({ selector: { type: 'match' } });
      res.json(response.docs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching matches' });
    }
  }

  static async createMatch(req: Request, res: Response): Promise<void> {
    try {
      const match = req.body;
      match.type = 'match';
      const response = await db.insert(match);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error creating match' });
    }
  }
}

export default MatchController;
