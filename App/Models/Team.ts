export type PlayerInTeamType = {
  _id: string;
  position: 'striker' | 'defender';
  name: string;
  goals: number;
  blocks: number;
};

export type TeamType = {
  _id: string;
  _rev: string;
  type: 'team';
  team: {
    name: string;
    players: [PlayerInTeamType, PlayerInTeamType];
  };
};

export function isTeamType(doc: any): doc is TeamType {
  return doc && doc.type === 'team' && doc.team;
}
