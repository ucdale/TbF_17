import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Paper,
  TextField
} from '@mui/material';
import axios from 'axios';
import { MatchType, PlayerInMatchType } from '../../../types/MatchType';
import ModalStyled from '../../../components/ModalStyled';
import { PlayerInTeamType, TeamType } from '../../../types/TeamType';
import TeamMatchBox from '../../../components/Matches/TeamMatchBox';
import ItemBox from '../../../components/ItemBox';
import EditScoreTeamMatchBox from './EditScoreTeamMatchBox';
import { PlayerType } from '../../../types/PlayerType';

type ModalEditMatchScoreProps = {
  show: boolean;
  onClose: (refresh?: boolean) => void;
  match: MatchType;
};

const ModalEditMatchScore: React.FC<ModalEditMatchScoreProps> = ({
  show,
  onClose,
  match
}) => {
  const [error, setError] = useState({ show: false, Message: '' });
  const [redTeamScore, setRedTeamScore] = useState<number | null>(
    match.teamRed.score
  );
  const [blueTeamScore, setBlueTeamScore] = useState<number | null>(
    match.teamBlue.score
  );
  const [redTeamPlayerStriker, setRedTeamPlayerStriker] = useState(
    match.teamRed.players.find(
      (player: PlayerInMatchType) => player.position === 'striker'
    )
  );
  const [redTeamPlayerDefender, setRedTeamPlayerDefender] = useState(
    match.teamRed.players.find(
      (player: PlayerInMatchType) => player.position === 'defender'
    )
  );
  const [blueTeamPlayerStriker, setBlueTeamPlayerStriker] = useState(
    match.teamBlue.players.find(
      (player: PlayerInMatchType) => player.position === 'striker'
    )
  );
  const [blueTeamPlayerDefender, setBlueTeamPlayerDefender] = useState(
    match.teamBlue.players.find(
      (player: PlayerInMatchType) => player.position === 'defender'
    )
  );

  const resetDati = useCallback(() => {
    setError({ show: false, Message: '' });
  }, []);

  useEffect(() => {
    if (!show) {
      resetDati();
    }
  }, [resetDati, show]);

  const changePlayerGoals = useCallback(
    (team: 'red' | 'blue', position: 'striker' | 'defender', goals: number) => {
      if (team === 'red') {
        if (position === 'striker') {
          setRedTeamPlayerStriker((prev) =>
            prev ? { ...prev, goals } : undefined
          );
        }
        if (position === 'defender') {
          setRedTeamPlayerDefender((prev) =>
            prev ? { ...prev, goals } : undefined
          );
        }
      }
      if (team === 'blue') {
        if (position === 'striker') {
          setBlueTeamPlayerStriker((prev) =>
            prev ? { ...prev, goals } : undefined
          );
        }
        if (position === 'defender') {
          setBlueTeamPlayerDefender((prev) =>
            prev ? { ...prev, goals } : undefined
          );
        }
      }
    },
    []
  );

  useEffect(() => {
    if (
      redTeamPlayerStriker &&
      typeof redTeamPlayerStriker.goals === 'number' &&
      redTeamPlayerDefender &&
      typeof redTeamPlayerDefender.goals === 'number'
    ) {
      setRedTeamScore(redTeamPlayerStriker.goals + redTeamPlayerDefender.goals);
    }
  }, [redTeamPlayerDefender, redTeamPlayerStriker]);

  useEffect(() => {
    if (
      blueTeamPlayerStriker &&
      typeof blueTeamPlayerStriker.goals === 'number' &&
      blueTeamPlayerDefender &&
      typeof blueTeamPlayerDefender.goals === 'number'
    ) {
      setRedTeamScore(
        blueTeamPlayerStriker.goals + blueTeamPlayerDefender.goals
      );
    }
  }, [blueTeamPlayerDefender, blueTeamPlayerStriker]);

  const modificaGoalPlayer = useCallback(async (id: string, goals: number) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/player/updateGoals',
        {
          id,
          goals
        }
      );
      if (response.status === 200) {
        console.log('Match name updated successfully:', response.data);
      } else {
        console.error('Error updating match name:', 'qualcosa è andato storto');
      }
    } catch (error) {
      console.error('Error updating match name:', error);
    }
  }, []);

  const modificaPunteggioMatch = useCallback(
    async (id: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/match/updateMatchScore',
          {
            id,
            redTeamScore,
            blueTeamScore
          }
        );
        if (response.status === 200) {
          console.log('Match name updated successfully:', response.data);
        } else {
          console.error(
            'Error updating match name:',
            'qualcosa è andato storto'
          );
        }
      } catch (error) {
        console.error('Error updating match name:', error);
      }
    },
    [blueTeamScore, redTeamScore]
  );

  // const saveScoresForMatchAndPlayers = useCallback(
  //   (matchId: string) => {
  //     if (redTeamPlayerOneScore !== match.teamRed.players)
  //       try {
  //         const response = await axios.post(
  //           'http://localhost:3001/match/updateMatchScore',
  //           {
  //             matchId,
  //             redTeamScore,
  //             blueTeamScore
  //           }
  //         );
  //         if (response.status === 200) {
  //           console.log('Match name updated successfully:', response.data);
  //         } else {
  //           console.error(
  //             'Error updating match name:',
  //             'qualcosa è andato storto'
  //           );
  //         }
  //       } catch (error) {
  //         console.error('Error updating match name:', error);
  //       }
  //   },
  //   [blueTeamScore, redTeamScore]
  // );

  return (
    <ModalStyled
      title={
        match
          ? `Edit score for ${match.teamRed.name} vs ${match.teamBlue.name}`
          : ''
      }
      show={show}
      onClose={onClose}
    >
      <div>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <EditScoreTeamMatchBox
            match={match}
            teamRed
            teamScore={redTeamScore || 0}
            playerOneScore={redTeamPlayerStriker?.goals || 0}
            playerTwoScore={redTeamPlayerDefender?.goals || 0}
            setPlayerOneScore={(goals: number) =>
              changePlayerGoals('red', 'striker', goals)
            }
            setPlayerTwoScore={(goals: number) =>
              changePlayerGoals('red', 'defender', goals)
            }
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '50%',
              paddingRight: '50%'
            }}
          >
            vs
          </div>
          <EditScoreTeamMatchBox
            match={match}
            teamBlue
            teamScore={blueTeamScore || 0}
            playerOneScore={blueTeamPlayerStriker?.goals || 0}
            playerTwoScore={blueTeamPlayerDefender?.goals || 0}
            setPlayerOneScore={(goals: number) =>
              changePlayerGoals('blue', 'striker', goals)
            }
            setPlayerTwoScore={(goals: number) =>
              changePlayerGoals('blue', 'defender', goals)
            }
          />
        </Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row-reverse' }
          }}
        >
          {/* <Button
            variant='contained'
            onClick={
              matchToEdit
                ? () => modificaMatch(matchToEdit!._id, name + '')
                : () => aggiungiMatch()
            }
            disabled={
              !redTeam ||
              redTeam?.name === '' ||
              redTeam?.name === null ||
              !blueTeam ||
              blueTeam?.name === '' ||
              blueTeam?.name === null
            }
          >
            {matchToEdit ? 'Edit' : 'Add'}
          </Button>
           <Button color='secondary' onClick={handleCloseModaleCreMatch}>
              Back
            </Button>
            */}
        </Box>
      </div>
    </ModalStyled>
  );
};

export default ModalEditMatchScore;
