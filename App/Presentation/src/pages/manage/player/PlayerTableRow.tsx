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
import { PlayerType } from '../../../types/PlayerType';
import StyledMenu from '../../../components/StyledMenu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import Transition from '../../../components/Trasition';
// import {
//   DialogsProvider,
//   useDialogs,
//   DialogProps
// } from '@toolpad/core/useDialogs';

type PlayerTableRowProps = {
  player: PlayerType;
  setShowModaleCreaPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerToEdit: React.Dispatch<React.SetStateAction<PlayerType | null>>;
  deletePlayer: (id: string) => void;
};

const PlayerTableRow: React.FC<PlayerTableRowProps> = ({
  player,
  setShowModaleCreaPlayer,
  setPlayerToEdit,
  deletePlayer
}) => {
  //const dialogs = useDialogs(); // sarebbe stato carino usare toolpad/core/useDialogs ma voleva che usassi react 18

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
        key={player._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          {player.name}
        </TableCell>
        <TableCell>{player.goals}</TableCell>
        <TableCell>{player.blocks}</TableCell>
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
                  setPlayerToEdit(player);
                  setShowModaleCreaPlayer(true);
                }}
                disableRipple
              >
                <EditIcon />
                Edit name
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
          <DialogTitle>{`Delete ${player.name} ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deletePlayer(player._id)}>Delete</Button>
            <Button variant='contained' onClick={handleCloseConfirmDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </TableRow>
    </>
  );
};

export default PlayerTableRow;
