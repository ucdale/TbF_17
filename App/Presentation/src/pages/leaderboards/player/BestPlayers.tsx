import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Grid2 as Grid } from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';
import axios from 'axios';
import SortableTable from './SortableTable';

const BestPlayers: React.FC = () => {
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

  interface HeadCell {
    disablePadding: boolean;
    id: keyof PlayerType;
    label: string;
    numeric: boolean;
  }

  const headCells: HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name'
    },
    {
      id: 'goals',
      numeric: true,
      disablePadding: false,
      label: 'Goals'
    }
    // {
    //   id: 'blocks',
    //   numeric: true,
    //   disablePadding: false,
    //   label: 'Blocks'
    // }
  ];

  return (
    <div className='manageTable-div'>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            <h1 className='header-title' style={{ marginBottom: '40px' }}>
              Players leaderboards
            </h1>
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: '40px' }}>
        {players ? (
          <div>
            <SortableTable headCells={headCells} rows={players} />
          </div>
        ) : (
          <CircularProgress sx={{ marginTop: '40' }} size={40} />
        )}
      </div>
    </div>
  );
};

export default BestPlayers;
