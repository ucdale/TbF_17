import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
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
import { TeamType } from '../../../types/TeamType';
import axios from 'axios';
import TeamTableRow from './TeamTableRow';
import AddIcon from '@mui/icons-material/Add';

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
      </Grid>
      <div style={{ marginTop: '40px' }}>
        {teams ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Wins</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams && teams.length > 0 ? (
                  teams.map((team) => (
                    <TeamTableRow key={team.name} team={team} />
                  ))
                ) : (
                  <h3>There are no teams yet ...</h3>
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

export default BestTeams;
