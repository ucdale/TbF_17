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
import { TeamType } from '../../../types/TeamType';
import axios from 'axios';
import TeamTableRow from './TeamTableRow';

const ManageTeams: React.FC = () => {
  const [teams, setTeams] = useState<TeamType[] | null>(null);

  const getTeams = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/team/getAllTeams'
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
    const data = await getTeams();
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
    <div>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            <h1 className='header-title' style={{ marginBottom: '40px' }}>
              Manage Teams
            </h1>
          </div>
        </Grid>
      </Grid>
      <div className='manageTable-div'>
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
                  <TableCell>Striker</TableCell>
                  <TableCell>Defender</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams && teams.length > 0 ? (
                  teams.map((team) => (
                    <TeamTableRow key={team._id} team={team} />
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

export default ManageTeams;
