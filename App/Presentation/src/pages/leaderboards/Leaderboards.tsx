import React from 'react';

import BestTeams from './team/BestTeams';
import BestPlayers from './player/BestPlayers';

const Leaderboards: React.FC = () => {
  return (
    <div>
      <BestTeams />
      <BestPlayers />
    </div>
  );
};

export default Leaderboards;
