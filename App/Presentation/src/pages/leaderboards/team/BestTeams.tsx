import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Grid2 as Grid } from '@mui/material';
import axios from 'axios';
import SortableTable from './SortableTable';

const BestTeams: React.FC = () => {
  const [teams, setTeams] = useState<{ name: string; wins: number }[] | null>(
    null
  );

  const getTeamsWithWins = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/match/getWinnersOfMatches'
      );
      if (response.status !== 200) {
        console.error('Error fetching teams:', 'qualcosa è andato storto');
        return null;
      }
      // return response.data.teams;
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      return null;
    }
  };

  const ottieniTeams = useCallback(async () => {
    const data = await getTeamsWithWins();
    if (data) {
      setTeams(data);
    }
  }, []);

  useEffect(() => {
    if (!teams) {
      ottieniTeams();
    }
  }, [teams, ottieniTeams]);

  interface HeadCell {
    disablePadding: boolean;
    id: keyof { name: string; wins: number };
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
      id: 'wins',
      numeric: true,
      disablePadding: false,
      label: 'Wins'
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
              Best Teams
            </h1>
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: '40px' }}>
        {teams ? (
          <div>
            <SortableTable headCells={headCells} rows={teams} />
          </div>
        ) : (
          <CircularProgress sx={{ marginTop: '40' }} size={40} />
        )}
      </div>
    </div>
  );
};

export default BestTeams;
