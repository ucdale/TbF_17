import { TeamType } from './TeamType';

export type PlayerInMatchType = {
  _id: string;
  position: 'striker' | 'defender';
  name: string;
  goals: number;
  blocks: number;
};

export type TeamInMatchType = Omit<TeamType, 'players'> & {
  players: [PlayerInMatchType, PlayerInMatchType];
  score: number;
};

export type MatchType = {
  _id: string;
  teamRed: TeamInMatchType;
  teamBlue: TeamInMatchType;
  status: 'ongoing' | 'completed';
  date: Date;
};
