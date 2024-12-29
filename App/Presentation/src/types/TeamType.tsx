import { PlayerType } from './PlayerType';

export type PlayerInTeamType = PlayerType & {
  position: 'striker' | 'defender';
};

export type TeamType = {
  _id: string;
  name: string;
  players: [PlayerInTeamType, PlayerInTeamType];
};
