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
import { allMatches, matchById } from '../DataSources/match.dataSource';
import { allTeams } from '../DataSources/team.dataSource';
import { MatchType } from '../Models/Match';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class MatchController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    try {
      const matches = await allMatches();
      res.json(matches);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error fetching matches' });
    }
  }

  static async getWinnersOfMatches(req: Request, res: Response): Promise<void> {
    try {
      const matchDocs = await allMatches();
      const teamDocs = await allTeams();

      const winnersCount: { name: string; wins: number }[] = teamDocs.map(
        (doc: any) => {
          return {
            name: doc.name,
            wins: 0
          };
        }
      );

      // Conta le occorrenze di ogni vincitore
      matchDocs.forEach((doc: any) => {
        const winner = doc.winner;
        if (winner) {
          const elementoTrovato = winnersCount.find((x) => x.name === winner);
          if (!elementoTrovato) {
            winnersCount.push({ name: winner, wins: 1 });
          } else {
            elementoTrovato.wins++;
          }
        }
      });

      res.json(winnersCount);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error fetching matches' });
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
      res.status(500).json({ error: error.message || 'Error creating match' });
    }
  }

  static async endMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      const matchDoc = await matchById(id);

      // Modifica il campo status del match a 'completed'
      matchDoc.match.status = 'completed';

      // Metto il nome del team vincitore se è un pareggio metto vuoto
      matchDoc.match.winner =
        matchDoc.match.teamBlue.score > matchDoc.match.teamRed.score
          ? matchDoc.match.teamBlue.name
          : matchDoc.match.teamBlue.score < matchDoc.match.teamRed.score
          ? matchDoc.match.teamRed.name
          : '';

      // Aggiorna il documento nel database
      const response = await db.insert(matchDoc);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error ending match' });
    }
  }

  static async updateMatchScore(req: Request, res: Response): Promise<void> {
    try {
      const {
        id,
        redTeamScore,
        blueTeamScore,
        redStrikerGoals,
        redDefenderGoals,
        blueStrikerGoals,
        blueDefenderGoals
      } = req.body;

      const matchDoc = await matchById(id);

      if (redTeamScore) {
        matchDoc.match.teamRed.score = redTeamScore;
      }
      if (blueTeamScore) {
        matchDoc.match.teamBlue.score = blueTeamScore;
      }

      if (redStrikerGoals) {
        matchDoc.match.teamRed.players.find(
          (x) => x.position === 'striker'
        ).goals = redStrikerGoals;
      }

      if (redDefenderGoals) {
        matchDoc.match.teamRed.players.find(
          (x) => x.position === 'defender'
        ).goals = redDefenderGoals;
      }

      if (blueStrikerGoals) {
        matchDoc.match.teamBlue.players.find(
          (x) => x.position === 'striker'
        ).goals = blueStrikerGoals;
      }

      if (blueDefenderGoals) {
        matchDoc.match.teamBlue.players.find(
          (x) => x.position === 'defender'
        ).goals = blueDefenderGoals;
      }

      // Aggiorna il documento nel database
      const response = await db.insert(matchDoc);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error ending match' });
    }
  }

  static async deleteMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      console.log('>>>>>>>>>>>>>>>>>>>', id);

      const matchDoc = await matchById(id);

      console.log('>>>>>>>>>>>>>>>>>>>', matchDoc._rev);

      const response = await db.destroy(id, matchDoc._rev);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error deleting match' });
    }
  }
}

export default MatchController;
