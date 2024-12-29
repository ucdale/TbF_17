import React, { useMemo } from 'react';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { MatchType } from '../../../types/MatchType';
import ItemBox from '../../../components/ItemBox';
import { PlayerInTeamType } from '../../../types/TeamType';
import NumberInput from '../../../components/NumberInput';

type EditScoreTeamMatchBoxProps = {
  match: MatchType;
  teamRed?: boolean;
  teamBlue?: boolean;
  teamScore: number;
  playerOneScore: number;
  playerTwoScore: number;
  setPlayerOneScore: (score: number) => void;
  setPlayerTwoScore: (score: number) => void;
};

const EditScoreTeamMatchBox: React.FC<EditScoreTeamMatchBoxProps> = ({
  match,
  teamScore,
  playerOneScore,
  setPlayerOneScore,
  playerTwoScore,
  setPlayerTwoScore,
  teamRed = false,
  teamBlue = false
}) => {
  const correctTeamColor = useMemo(
    () => (teamRed ? match.teamRed : teamBlue ? match.teamBlue : null),
    [match.teamBlue, match.teamRed, teamBlue, teamRed]
  );

  return (
    <ItemBox>
      <Box
        style={{
          color: teamRed ? 'red' : teamBlue ? 'blue' : '',
          marginBottom: '24px'
        }}
        sx={{
          fontSize: 'h4.fontSize',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {correctTeamColor?.name}
      </Box>
      <Box
        sx={{
          fontSize: 'h4.fontSize',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {teamScore}
      </Box>
      <Typography sx={{ mt: 2, mb: 1 }}>
        Striker:{' '}
        {
          correctTeamColor?.players.find(
            (player: PlayerInTeamType) => player.position === 'striker'
          )?.name
        }
      </Typography>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            {/* usato questo componete per via di questa nota sulla documentazione di MUI
            We do not recommend using type="number" with a Text Field due to potential usability issues */}
            <NumberInput
              required
              min={0}
              max={12}
              onChange={(event, val) => setPlayerOneScore(val || 0)}
              value={playerOneScore}
            />
          </div>
        </Grid>
      </Grid>
      <Typography sx={{ mt: 2, mb: 1 }}>
        Defender:{' '}
        {
          correctTeamColor?.players.find(
            (player: PlayerInTeamType) => player.position === 'defender'
          )?.name
        }
      </Typography>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            {/* usato questo componete per via di questa nota sulla documentazione di MUI
            We do not recommend using type="number" with a Text Field due to potential usability issues */}
            <NumberInput
              required
              min={0}
              max={12}
              onChange={(event, val) => setPlayerTwoScore(val || 0)}
              value={playerTwoScore}
            />
          </div>
        </Grid>
      </Grid>
    </ItemBox>
  );
};
export default EditScoreTeamMatchBox;
