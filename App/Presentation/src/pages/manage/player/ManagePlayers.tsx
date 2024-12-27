import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2 as Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';
import axios from 'axios';
import PlayerTableRow from './PlayerTableRow';
import AddIcon from '@mui/icons-material/Add';
import ModalStyled from '../../../components/ModalStyled';

const ManagePlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerType[] | null>(null);
  const [error, setError] = useState({ show: false, Message: '' });
  const [showModaleCreaPlayer, setShowModaleCreaPlayer] =
    useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const getPlayers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/player/getAllPlayers'
      );
      if (response.status !== 200) {
        console.error('Error fetching players:', 'qualcosa è andato storto');
        return null;
      }
      // return response.data.players;
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      return null;
    }
  };

  const ottieniPlayers = useCallback(async () => {
    const data = await getPlayers();
    if (data) {
      setPlayers(data);
    }
  }, []);

  useEffect(() => {
    if (!players) {
      ottieniPlayers();
    }
  }, [players, ottieniPlayers]);

  const handleCloseModaleCreaPlayer = useCallback((refresh = false) => {
    setShowModaleCreaPlayer(false);
    setName('');
    setError({ show: false, Message: '' });
    if (refresh) {
      setPlayers(null);
    }
  }, []);

  const aggiungiPlayer = useCallback(async () => {
    try {
      const newPlayer = {
        name
      };
      const response = await axios.post(
        'http://localhost:3001/player/createPlayer',
        newPlayer
      );
      if (response.status === 200) {
        debugger;
        setPlayers((prevPlayers) =>
          prevPlayers ? [...prevPlayers, response.data] : [response.data]
        );
        handleCloseModaleCreaPlayer(false);
      } else {
        setError({ show: true, Message: response.data.error });
        console.error('Error adding player:', 'qualcosa è andato storto');
      }
    } catch (error) {
      setError({ show: true, Message: 'Something went wrong' });
      console.error('Error adding player:', error);
    }
  }, [handleCloseModaleCreaPlayer, name]);

  const updatePlayerName = useCallback(
    async (id: string, newName: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/player/updatePlayerName',
          {
            id,
            name: newName
          }
        );
        if (response.status === 200) {
          console.log('Player name updated successfully:', response.data);
          // Update the local state or re-fetch the players
          ottieniPlayers();
        } else {
          console.error(
            'Error updating player name:',
            'qualcosa è andato storto'
          );
        }
      } catch (error) {
        console.error('Error updating player name:', error);
      }
    },
    [ottieniPlayers]
  );

  const deletePlayer = async (id: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/player/deletePlayer',
        { id }
      );
      if (response.status === 200) {
        console.log('Player deleted successfully:', response.data);
        // Update the local state or re-fetch the players
        ottieniPlayers();
      } else {
        console.error('Error deleting player:', 'qualcosa è andato storto');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div className='manageTable-div'>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            <h1 className='header-title' style={{ marginBottom: '40px' }}>
              Manage Teams
            </h1>
          </div>
        </Grid>
        <Grid size={9}></Grid>
        <Grid size={3} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => setShowModaleCreaPlayer(true)}
            startIcon={<AddIcon />}
            size='medium'
          >
            Add new player
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: '40px' }}>
        {players ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Goals</TableCell>
                  <TableCell>Blocks</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players && players.length > 0 ? (
                  players.map((player) => (
                    <PlayerTableRow key={player._id} player={player} />
                  ))
                ) : (
                  <h3>There are no players yet ...</h3>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress sx={{ marginTop: '40' }} size={40} />
        )}
      </div>
      <ModalStyled
        title='Add new player'
        show={showModaleCreaPlayer}
        onClose={handleCloseModaleCreaPlayer}
      >
        <div>
          <Box
            component='form'
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete='off'
          >
            {error.show && (
              <Alert sx={{ mb: 3 }} severity='error'>
                {error.Message}
              </Alert>
            )}
            <FormControl defaultValue='' required>
              <TextField
                id='name'
                label='Name'
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
                error={name === ''}
                helperText={name === '' && 'Required'}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' }
            }}
          >
            <Button
              variant='contained'
              onClick={() => aggiungiPlayer()}
              disabled={!name}
            >
              Add
            </Button>
            {/* <Button color='secondary' onClick={handleCloseModaleCreaPlayer}>
              Cancel
            </Button> */}
          </Box>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ManagePlayers;
