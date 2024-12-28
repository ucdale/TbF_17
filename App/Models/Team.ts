export type PlayerInTeamType = {
  position: 'striker' | 'defender';
  name: string;
};

export type TeamType = {
  _id: string;
  name: string;
  players: [PlayerInTeamType, PlayerInTeamType];
};
