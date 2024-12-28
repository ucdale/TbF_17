import { TeamType } from './TeamType';

export type MatchType = {
  _id: string;
  teamRed: TeamType & { score: number };
  teamBlue: TeamType & { score: number };
  status: 'ongoing' | 'completed';
  date: Date;
};
