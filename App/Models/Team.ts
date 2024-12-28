export type PlayerInTeamType = {
  position: 'striker' | 'defender';
  name: string;
};

export type TeamType = {
  _id: string;
  type: 'team';
  team: { name: string; players: [PlayerInTeamType, PlayerInTeamType] };
};
