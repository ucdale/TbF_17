export type PlayerType = {
  _id: string;
  type: 'player';
  player: {
    name: string;
    goals: number;
    blocks: number;
  };
};

export function isPlayerType(doc: any): doc is PlayerType {
  return doc && doc.type === 'player' && doc.player;
}
