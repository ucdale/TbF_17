export type PlayerType = {
  _id: string;
  type: 'player';
  player: {
    name: string;
    goals: number;
    blocks: number;
  };
};
