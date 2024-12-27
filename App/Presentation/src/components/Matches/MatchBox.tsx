import React from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { MatchType } from '../../types/MatchType';
import ItemBox from '../ItemBox';
import { PlayerInTeamType } from '../../types/TeamType';

type MatchBoxProps = {
  match: MatchType;
};

const MatchBox: React.FC<MatchBoxProps> = ({ match }) => {
  const [anchorTeamRed, setAnchorTeamRed] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorTeamBlue, setAnchorTeamBlue] =
    React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    team: 'red' | 'blue'
  ) => {
    if (team === 'red') {
      setAnchorTeamRed(event.currentTarget);
    } else {
      setAnchorTeamBlue(event.currentTarget);
    }
  };

  const handlePopoverClose = (team: 'red' | 'blue') => {
    if (team === 'red') {
      setAnchorTeamRed(null);
    } else {
      setAnchorTeamBlue(null);
    }
  };

  const openTeamRed = Boolean(anchorTeamRed);
  const openTeamBlue = Boolean(anchorTeamBlue);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <ItemBox>
        <div
          aria-owns={openTeamRed ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={(event) => handlePopoverOpen(event, 'red')}
          onMouseLeave={() => handlePopoverClose('red')}
          style={{ color: 'red', marginBottom: '24px' }}
        >
          {match.teamRed.name}
        </div>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold' }}>
          {match.teamRed.score}
        </Box>
        <Popover
          id='mouse-over-popover'
          sx={{ pointerEvents: 'none' }}
          open={openTeamRed}
          anchorEl={anchorTeamRed}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            Striker:{' '}
            {
              match.teamRed.players.find(
                (player: PlayerInTeamType) => player.position === 'striker'
              )?.name
            }
          </Typography>
          <Typography sx={{ p: 1 }}>
            Defender:{' '}
            {
              match.teamRed.players.find(
                (player: PlayerInTeamType) => player.position === 'defender'
              )?.name
            }
          </Typography>
        </Popover>
      </ItemBox>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '50%',
          paddingRight: '50%'
        }}
      >
        vs
      </div>
      <ItemBox>
        <div
          aria-owns={openTeamBlue ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={(event) => handlePopoverOpen(event, 'blue')}
          onMouseLeave={() => handlePopoverClose('blue')}
          style={{ color: 'blue', marginBottom: '24px' }}
        >
          {match.teamBlue.name}
        </div>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold' }}>
          {match.teamBlue.score}
        </Box>
        <Popover
          id='mouse-over-popover'
          sx={{ pointerEvents: 'none' }}
          open={openTeamBlue}
          anchorEl={anchorTeamBlue}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            Striker:{' '}
            {
              match.teamBlue.players.find(
                (player: PlayerInTeamType) => player.position === 'striker'
              )?.name
            }
          </Typography>
          <Typography sx={{ p: 1 }}>
            Defender:{' '}
            {
              match.teamBlue.players.find(
                (player: PlayerInTeamType) => player.position === 'defender'
              )?.name
            }
          </Typography>
        </Popover>
      </ItemBox>
    </Box>
  );
};
export default MatchBox;
