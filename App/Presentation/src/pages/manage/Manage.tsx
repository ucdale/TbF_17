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
import { TeamType } from '../../types/TeamType';
import axios from 'axios';
import TeamTableRow from './team/TeamTableRow';
import ManageTeams from './team/ManageTeams';
import ManagePlayers from './player/ManagePlayers';

const Manage: React.FC = () => {
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
      <ManageTeams />
      <ManagePlayers />
    </div>
  );
};

export default Manage;
