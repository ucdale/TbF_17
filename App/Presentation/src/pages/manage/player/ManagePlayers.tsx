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
  TableRow
} from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';
import axios from 'axios';
import PlayerTableRow from './PlayerTableRow';
import AddIcon from '@mui/icons-material/Add';
import ModalNewPlayer from './ModalNewPlayer';

const ManagePlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerType[] | null>(null);
  const [showModaleCreaPlayer, setShowModaleCreaPlayer] =
    useState<boolean>(false);
  const [playerToEdit, setPlayerToEdit] = useState<PlayerType | null>(null);

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
    setPlayerToEdit(null);
    // setError({ show: false, Message: '' });
    if (refresh) {
      setPlayers(null);
    }
  }, []);

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
                    <PlayerTableRow
                      key={player._id}
                      player={player}
                      setShowModaleCreaPlayer={setShowModaleCreaPlayer}
                      setPlayerToEdit={setPlayerToEdit}
                      deletePlayer={deletePlayer}
                    />
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
      <ModalNewPlayer
        show={showModaleCreaPlayer}
        onClose={handleCloseModaleCreaPlayer}
        setPlayers={setPlayers}
        playerToEdit={playerToEdit}
      />
    </div>
  );
};

export default ManagePlayers;
