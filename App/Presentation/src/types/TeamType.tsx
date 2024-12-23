import { PlayerType } from './PlayerType';

export type TeamType = {
  _id?: string;
  name: string;
  players: PlayerType[];
};
