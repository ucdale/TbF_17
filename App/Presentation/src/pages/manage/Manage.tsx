import React from 'react';

import ManageTeams from './team/ManageTeams';
import ManagePlayers from './player/ManagePlayers';

const Manage: React.FC = () => {
  return (
    <div>
      <ManageTeams />
      <ManagePlayers />
    </div>
  );
};

export default Manage;
