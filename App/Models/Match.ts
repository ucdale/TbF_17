export interface Player {
  name: string;
  goals: number;
  blocks: number;
}

export interface Team {
  name: string;
  players: Player[];
  score: number;
}

export interface Match {
  _id?: string;
  teamRed: Team;
  teamBlue: Team;
  status: 'scheduled' | 'ongoing' | 'completed';
  date: Date;
}

const exampleMatch: Match = {
  teamRed: {
    name: 'Raging Bulls',
    players: [
      { name: 'pippo', goals: 0, blocks: 2 },
      { name: 'pluto', goals: 0, blocks: 1 }
    ],
    score: 0
  },
  teamBlue: {
    name: 'Quacking Ducks',
    players: [
      { name: 'paperino', goals: 1, blocks: 2 },
      { name: 'gastone', goals: 0, blocks: 1 }
    ],
    score: 1
  },
  status: 'ongoing',
  date: new Date()
};

export default Match;
