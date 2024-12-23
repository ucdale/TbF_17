export type PlayerType = {
  _id?: string;
  type: 'striker' | 'defender';
  name: string;
  goals: number;
  blocks: number;
};
