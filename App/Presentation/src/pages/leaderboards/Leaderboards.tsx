import React from 'react';

import BestTeams from './team/BestTeams';
import BestPlayers from './player/BestPlayers';
import { Grid2 as Grid } from '@mui/material';

const Leaderboards: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <BestTeams />
      </Grid>
      <Grid size={6}>
        <BestPlayers />
      </Grid>
    </Grid>
  );
};

export default Leaderboards;
