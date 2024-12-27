import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TableCell,
  TableRow
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { PlayerInTeamType, TeamType } from '../../../types/TeamType';
import StyledMenu from '../../../components/StyledMenu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Transition from '../../../components/Trasition';

type TeamTableRowProps = {
  team: TeamType;
  setShowModaleCreaEditTeam: React.Dispatch<React.SetStateAction<boolean>>;
  setTeamToEdit: React.Dispatch<
    React.SetStateAction<
      (TeamType & { action: 'editName' | 'editMembers' }) | null
    >
  >;
  deleteTeam: (id: string) => void;
};

const TeamTableRow: React.FC<TeamTableRowProps> = ({
  team,
  setShowModaleCreaEditTeam,
  setTeamToEdit,
  deleteTeam
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
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
            team.players.find(
              (player: PlayerInTeamType) => player.position === 'striker'
            )?.name
          }
        </TableCell>
        <TableCell>
          {
            team.players.find(
              (player: PlayerInTeamType) => player.position === 'defender'
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  setTeamToEdit({ ...team, action: 'editName' });
                  setShowModaleCreaEditTeam(true);
                }}
                disableRipple
              >
                <EditIcon />
                Edit name
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setTeamToEdit({ ...team, action: 'editMembers' });
                  setShowModaleCreaEditTeam(true);
                }}
                disableRipple
              >
                <FileCopyIcon />
                Change members
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleClickOpenConfirmDialog();
                }}
                disableRipple
              >
                <DeleteIcon />
                Delete
              </MenuItem>
            </StyledMenu>
          </div>
        </TableCell>
        <Dialog
          open={openConfirmDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmDialog}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{`Delete ${team.name} ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteTeam(team._id)}>Delete</Button>
            <Button variant='contained' onClick={handleCloseConfirmDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </TableRow>
    </>
  );
};

export default TeamTableRow;
