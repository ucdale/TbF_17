// export interface Player {
//   // _id?: string;
//   // type: 'player',
//   name: string;
//   goals: number;
//   blocks: number;
// }

import { TeamType } from './Team';

// export interface Team {
//   name: string;
//   players: Player[];
//   score: number;
// }

// export interface Match {
//   _id?: string;
//   teamRed: Team;
//   teamBlue: Team;
//   status: 'scheduled' | 'ongoing' | 'completed';
//   date: Date;
// }

// const exampleMatch: Match = {
//   teamRed: {
//     name: 'Raging Bulls',
//     players: [
//       { name: 'pippo', goals: 0, blocks: 2 },
//       { name: 'pluto', goals: 0, blocks: 1 }
//     ],
//     score: 0
//   },
//   teamBlue: {
//     name: 'Quacking Ducks',
//     players: [
//       { name: 'paperino', goals: 1, blocks: 2 },
//       { name: 'gastone', goals: 0, blocks: 1 }
//     ],
//     score: 1
//   },
//   status: 'ongoing',
//   date: new Date()
// };

// export default Match;

export type PlayerInMatchType = {
  _id: string;
  position: 'striker' | 'defender';
  name: string;
  goals: number;
  blocks: number;
};

export type TeamInMatchType = {
  _id: string;
  name: string;
  players: [PlayerInMatchType, PlayerInMatchType];
  score: number;
};

export type MatchType = {
  _id: string;
  type: 'match';
  match: {
    teamRed: TeamInMatchType & { score: number };
    teamBlue: TeamType & { score: number };
    status: 'ongoing' | 'completed';
    date: Date;
  };
};

export function isMatchType(doc: any): doc is MatchType {
  return doc && doc.type === 'match' && doc.match;
}
