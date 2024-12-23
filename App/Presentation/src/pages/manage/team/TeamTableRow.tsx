import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import { PlayerType } from '../../../types/PlayerType';
import { TeamType } from '../../../types/TeamType';
import StyledMenu from '../../../components/StyledMenu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type TeamTableRowProps = {
  team: TeamType;
};

const TeamTableRow: React.FC<TeamTableRowProps> = ({ team }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow
        key={team._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          {team.name}
        </TableCell>
        <TableCell>
          {
            team.players.find((player: PlayerType) => player.type === 'striker')
              ?.name
          }
        </TableCell>
        <TableCell>
          {
            team.players.find(
              (player: PlayerType) => player.type === 'defender'
            )?.name
          }
        </TableCell>
        <TableCell align='right'>
          <div>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
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
              <MenuItem onClick={handleClose} disableRipple>
                <EditIcon />
                Edit name
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FileCopyIcon />
                Change members
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
            </StyledMenu>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TeamTableRow;
