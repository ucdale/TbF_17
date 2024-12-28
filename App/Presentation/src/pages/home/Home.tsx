import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Grid2 as Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import MatchBox from '../../components/Matches/MatchBox';
import { MatchType } from '../../types/MatchType';
import ItemBox from '../../components/ItemBox';
import { MoreVert } from '@mui/icons-material';
import ModalCreateEditMatch from './ModalCreateEditMatch';
import Transition from '../../components/Trasition';
import EditIcon from '@mui/icons-material/Edit';
import StyledMenu from '../../components/StyledMenu';
import DeleteIcon from '@mui/icons-material/Delete';

const Home: React.FC = () => {
  const [matches, setMatches] = useState<MatchType[] | null>(null);
  const [showModaleCreaEditMatch, setShowModaleCreaEditMatch] = useState(false);
  const [matchToEnd, setMatchToEnd] = useState<MatchType | null>(null);
  const [matchToEdit, setMatchToEdit] = useState<MatchType | null>(null);
  const [matchToDelete, setMatchToDelete] = useState<MatchType | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSomeOngoingdMatches = useMemo(
    () =>
      matches ? matches.some((match) => match.status === 'ongoing') : false,
    [matches]
  );

  const isSomeCompletedMatches = useMemo(
    () =>
      matches ? matches.some((match) => match.status === 'completed') : false,
    [matches]
  );

  const getMatches = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/match/getAllMatches'
      );
      if (response.status !== 200) {
        console.error('Error fetching matches:', 'qualcosa è andato storto');
        return null;
      }
      // return response.data.matches;
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      return null;
    }
  };

  const ottieniMatches = useCallback(async () => {
    const data = await getMatches();
    if (data) {
      setMatches(data);
    }
  }, []);

  useEffect(() => {
    if (!matches) {
      // setTimeout(() => {
      ottieniMatches();
      // }, 1000);
    }
  }, [matches, ottieniMatches]);

  const handleCloseModaleCreaEditMatch = useCallback((refresh = false) => {
    setShowModaleCreaEditMatch(false);
    setMatchToEdit(null);
    // setError({ show: false, Message: '' });
    if (refresh) {
      setMatches(null);
    }
  }, []);

  const handleCloseConfirmDialog = () => {
    setMatchToEnd(null);
  };

  const endMatch = useCallback(
    async (id: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/match/endMatch',
          { id }
        );
        if (response.status === 200) {
          console.log('Match ended successfully:', response.data);
          handleCloseConfirmDialog();
          ottieniMatches();
        } else {
          console.error('Error ending match:', 'qualcosa è andato storto');
        }
      } catch (error) {
        console.error('Error  ending match:', error);
      }
    },
    [ottieniMatches]
  );

  const deleteMatch = useCallback(
    async (id: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/match/deleteMatch',
          { id }
        );
        if (response.status === 200) {
          console.log('Match deleted successfully:', response.data);
          setMatchToDelete(null);
          ottieniMatches();
        } else {
          console.error('Error deleting match:', 'qualcosa è andato storto');
        }
      } catch (error) {
        console.error('Error deleting match:', error);
      }
    },
    [ottieniMatches]
  );

  return (
    <div>
      {matches ? (
        <div>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className='header-container'>
                <h1 className='header-title'>Ongoing matches</h1>
                {isSomeOngoingdMatches && (
                  <div className='button-container'>
                    <Button
                      onClick={() => setShowModaleCreaEditMatch(true)}
                      startIcon={<AddIcon />}
                      size='medium'
                    >
                      Start new match
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <div className='onGoingMatches-div'>
            {!isSomeOngoingdMatches ? (
              <div>
                <h3>No ongoing matches yet ...</h3>
                <Button
                  onClick={() => setShowModaleCreaEditMatch(true)}
                  startIcon={<AddIcon />}
                  variant='contained'
                  size='large'
                >
                  Start new match
                </Button>
              </div>
            ) : (
              <Grid container spacing={3}>
                {matches.map(
                  (match: MatchType) =>
                    match.status === 'ongoing' && (
                      <Box
                        sx={{ display: 'grid', gridAutoColumns: '1fr', gap: 3 }}
                      >
                        <ItemBox
                          key={match._id}
                          sx={{ gridRow: '1', gridColumn: 'span 6' }}
                        >
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
                                  setShowModaleCreaEditMatch(true);
                                }}
                                disableRipple
                              >
                                <EditIcon />
                                Edit match
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
                          <MatchBox match={match} />
                        </ItemBox>
                      </Box>
                    )
                )}
              </Grid>
            )}
          </div>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className='header-container'>
                <h1 className='header-title'>Last played matches</h1>
              </div>
            </Grid>
          </Grid>
          <div className='finishedMatches-div'>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size='small'
                aria-label='a dense table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Team Red</TableCell>
                    <TableCell>Team Blue</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                {isSomeCompletedMatches && (
                  <TableBody>
                    {matches.map(
                      (match) =>
                        match.status === 'completed' && (
                          <TableRow
                            key={match._id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {match.teamRed.name}
                            </TableCell>
                            <TableCell>{match.teamBlue.name}</TableCell>
                            <TableCell>
                              {match.teamRed.score} - {match.teamBlue.score}
                            </TableCell>
                            <TableCell>
                              {new Date(match.date).toLocaleDateString('it-IT')}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                )}
              </Table>
              {!isSomeCompletedMatches && (
                <h3>No completed matches played yet ...</h3>
              )}
            </TableContainer>
          </div>
        </div>
      ) : (
        <CircularProgress sx={{ marginTop: '40' }} size={40} />
      )}
      <ModalCreateEditMatch
        show={showModaleCreaEditMatch}
        onClose={handleCloseModaleCreaEditMatch}
        setMatches={setMatches}
        matchToEdit={matchToEdit}
      />
      {matchToEnd && (
        <Dialog
          open={!!matchToEnd._id}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmDialog}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{`End match ${matchToEnd.teamRed.name} vs ${matchToEnd.teamBlue.name} ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => endMatch(matchToEnd._id)}>End</Button>
            <Button variant='contained' onClick={() => setMatchToEnd(null)}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {matchToDelete && (
        <Dialog
          open={!!matchToDelete._id}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmDialog}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{`End match ${matchToDelete.teamRed.name} vs ${matchToDelete.teamBlue.name} ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteMatch(matchToDelete._id)}>
              Delete
            </Button>
            <Button variant='contained' onClick={() => setMatchToDelete(null)}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Home;
