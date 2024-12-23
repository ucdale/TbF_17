import { TeamType } from './TeamType';

export type MatchType = {
  _id?: string;
  teamRed: TeamType & { score: number };
  teamBlue: TeamType & { score: number };
  status: 'scheduled' | 'ongoing' | 'completed';
  date: Date;
};
