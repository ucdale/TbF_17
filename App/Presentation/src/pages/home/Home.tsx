import React, { useCallback, useEffect, useState } from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import {
  Box,
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
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import MatchBox from '../../components/Matches/MatchBox';
import { MatchType } from '../../types/MatchType';
import ItemBox from '../../components/ItemBox';
import { MoreVert } from '@mui/icons-material';

const Home: React.FC = () => {
  const [matches, setMatches] = useState<MatchType[] | null>(null);

  const getMatches = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/match/getAllMatches'
      );
      if (response.status !== 200) {
        console.error('Error fetching matches:', 'qualcosa è andato storto');
        return null;
      }
      return response.data.matches;
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

  return (
    <div>
      {matches ? (
        <div>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className='header-container'>
                <h1 className='header-title'>Ongoing matches</h1>
                {matches.length > 0 && (
                  <div className='button-container'>
                    <Button startIcon={<AddIcon />} size='medium'>
                      Start new match
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <div className='onGoingMatches-div'>
            {matches.length === 0 ? (
              <Button startIcon={<AddIcon />} variant='contained' size='large'>
                Start new match
              </Button>
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
                            <Button
                              sx={{
                                color: 'currentColor',
                                '& .MuiSlider-thumb': {
                                  borderRadius: '1px'
                                }
                              }}
                              size='small'
                              variant='outlined'
                              startIcon={<AlarmIcon />}
                            >
                              End Match
                            </Button>
                            <Button
                              sx={{
                                marginLeft: '8px',
                                color: 'currentColor',
                                '& .MuiSlider-thumb': {
                                  borderRadius: '1px'
                                }
                              }}
                              size='small'
                              startIcon={<MoreVert />}
                            >
                              More action
                            </Button>
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
                <TableBody>
                  {matches.some((match) => match.status === 'completed') ? (
                    matches.map(
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
                    )
                  ) : (
                    <h3>No completed matches played yet ...</h3>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <CircularProgress sx={{ marginTop: '40' }} size={40} />
      )}
      {/* <Button variant="contained" onClick={goToReactGuide}  className="App-link" >Learn React</Button> */}
    </div>
  );
};

export default Home;
