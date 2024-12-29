import React, { useMemo } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { MatchType } from '../../types/MatchType';
import ItemBox from '../ItemBox';
import { PlayerInTeamType } from '../../types/TeamType';

type TeamMatchBoxProps = {
  match: MatchType;
  teamRed?: boolean;
  teamBlue?: boolean;
};

const TeamMatchBox: React.FC<TeamMatchBoxProps> = ({
  match,
  teamRed = false,
  teamBlue = false
}) => {
  const [anchorTeam, setAnchorTeam] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTeam(event.currentTarget);
  };

  const handlePopoverClose = (team: 'red' | 'blue') => {
    setAnchorTeam(null);
  };

  const openTeamDetail = Boolean(anchorTeam);

  const correctTeamColor = useMemo(
    () => (teamRed ? match.teamRed : teamBlue ? match.teamBlue : null),
    [match.teamBlue, match.teamRed, teamBlue, teamRed]
  );

  return (
    <ItemBox>
      <Box
        aria-owns={openTeamDetail ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={(event) => handlePopoverOpen(event)}
        onMouseLeave={() => handlePopoverClose('red')}
        style={{
          color: teamRed ? 'red' : teamBlue ? 'blue' : '',
          marginBottom: '24px'
        }}
        sx={{ fontSize: 'h4.fontSize', fontWeight: 'bold' }}
      >
        {correctTeamColor?.name}
      </Box>
      <Box sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold' }}>
        {correctTeamColor?.score}
      </Box>
      <Popover
        id='mouse-over-popover'
        sx={{ pointerEvents: 'none' }}
        open={openTeamDetail}
        anchorEl={anchorTeam}
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
            correctTeamColor?.players.find(
              (player: PlayerInTeamType) => player.position === 'striker'
            )?.name
          }
        </Typography>
        <Typography sx={{ p: 1 }}>
          Defender:{' '}
          {
            correctTeamColor?.players.find(
              (player: PlayerInTeamType) => player.position === 'defender'
            )?.name
          }
        </Typography>
      </Popover>
    </ItemBox>
  );
};
export default TeamMatchBox;
