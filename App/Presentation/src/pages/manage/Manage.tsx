import React from 'react';

import ManageTeams from './team/ManageTeams';
import ManagePlayers from './player/ManagePlayers';

const Manage: React.FC = () => {
  return (
    <div>
      <ManagePlayers />

      <ManageTeams />
    </div>
  );
};

export default Manage;
