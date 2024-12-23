import React, { useCallback, useEffect, useState } from 'react';
import {
  CircularProgress,
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

const ManagePlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerType[] | null>(null);

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

  return (
    <div>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            <h1 className='header-title' style={{ marginBottom: '40px' }}>
              Manage Players
            </h1>
          </div>
        </Grid>
      </Grid>
      <div className='manageTable-div'>
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
    </div>
  );
};

export default ManagePlayers;
