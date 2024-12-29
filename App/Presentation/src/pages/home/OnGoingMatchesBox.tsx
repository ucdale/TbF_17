import React from 'react';
import { Box, Divider, Fab, MenuItem } from '@mui/material';
import { MatchType } from '../../types/MatchType';
// import { MoreVert } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemBox from '../../components/ItemBox';
import { MoreVert } from '@mui/icons-material';
import StyledMenu from '../../components/StyledMenu';
import EditIcon from '@mui/icons-material/Edit';
import TeamMatchBox from '../../components/Matches/TeamMatchBox';
import AlarmIcon from '@mui/icons-material/Alarm';

type FinishedMatchesTableProps = {
  match: MatchType;
  setMatchToEnd: (match: MatchType) => void;
  setMatchToEdit: (match: MatchType) => void;
  setMatchToDelete: (match: MatchType) => void;
  setMatchAndShowModaleEditMatchScore: (match: MatchType) => void;
};

const OnGoingMatchesBox: React.FC<FinishedMatchesTableProps> = ({
  match,
  setMatchToEnd,
  setMatchToEdit,
  setMatchToDelete,
  setMatchAndShowModaleEditMatchScore
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gap: 3 }}>
      <ItemBox key={match._id} sx={{ gridRow: '1', gridColumn: 'span ' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '24px'
          }}
        >
          <Fab
            onClick={handleClick}
            size='small'
            color='secondary'
            sx={{ mr: 1 }}
          >
            <MoreVert />
          </Fab>
          <StyledMenu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            id='demo-customized-menu'
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setMatchToEdit(match);
                setMatchAndShowModaleEditMatchScore(match);
              }}
              disableRipple
            >
              <EditIcon />
              Edit score
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleClose();
                setMatchToDelete(match);
              }}
              disableRipple
            >
              <DeleteIcon />
              Delete
            </MenuItem>
          </StyledMenu>
          <Fab
            size='medium'
            color='primary'
            variant='extended'
            onClick={() => {
              setMatchToEnd(match);
            }}
          >
            <AlarmIcon sx={{ mr: 1 }} />
            End
          </Fab>
        </div>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <TeamMatchBox match={match} teamRed />
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
          <TeamMatchBox match={match} teamBlue />
        </Box>
      </ItemBox>
    </Box>
  );
};

export default OnGoingMatchesBox;
