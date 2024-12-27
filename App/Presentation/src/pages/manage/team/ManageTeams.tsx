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
import ModalCreateEditTeam from './ModalCreateEditTeam';

const ManageTeams: React.FC = () => {
  const [teams, setTeams] = useState<TeamType[] | null>(null);
  const [showModaleCreaEditTeam, setShowModaleCreaEditTeam] =
    useState<boolean>(false);
  const [teamToEdit, setTeamToEdit] = useState<
    (TeamType & { action: 'editName' | 'editMembers' }) | null
  >(null);

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

  const handleCloseModaleCreaEditTeam = useCallback((refresh = false) => {
    setShowModaleCreaEditTeam(false);
    setTeamToEdit(null);
    // setError({ show: false, Message: '' });
    if (refresh) {
      setTeams(null);
    }
  }, []);

  const deleteTeam = async (id: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/team/deleteTeam',
        { id }
      );
      if (response.status === 200) {
        console.log('Team deleted successfully:', response.data);
        ottieniTeams();
      } else {
        console.error('Error deleting team:', 'qualcosa è andato storto');
      }
    } catch (error) {
      console.error('Error deleting team:', error);
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
            onClick={() => setShowModaleCreaEditTeam(true)}
            startIcon={<AddIcon />}
            size='medium'
          >
            Add new team
          </Button>
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
                  <TableCell>Striker</TableCell>
                  <TableCell>Defender</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams && teams.length > 0 ? (
                  teams.map((team) => (
                    <TeamTableRow
                      key={team._id}
                      team={team}
                      setShowModaleCreaEditTeam={setShowModaleCreaEditTeam}
                      setTeamToEdit={setTeamToEdit}
                      deleteTeam={deleteTeam}
                    />
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
      <ModalCreateEditTeam
        show={showModaleCreaEditTeam}
        onClose={handleCloseModaleCreaEditTeam}
        setTeams={setTeams}
        teamToEdit={teamToEdit}
      />
    </div>
  );
};

export default ManageTeams;
