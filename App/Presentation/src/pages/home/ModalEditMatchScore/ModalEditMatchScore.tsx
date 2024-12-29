import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const originalStrikerInRedTeam = useMemo(
    () =>
      match.teamRed.players.find(
        (player: PlayerInMatchType) => player.position === 'striker'
      ),
    [match.teamRed.players]
  );

  const originalDefenderInRedTeam = useMemo(
    () =>
      match.teamRed.players.find(
        (player: PlayerInMatchType) => player.position === 'defender'
      ),
    [match.teamRed.players]
  );

  const originalStrikerInBlueTeam = useMemo(
    () =>
      match.teamBlue.players.find(
        (player: PlayerInMatchType) => player.position === 'striker'
      ),
    [match.teamBlue.players]
  );

  const originalDefenderInBlueTeam = useMemo(
    () =>
      match.teamBlue.players.find(
        (player: PlayerInMatchType) => player.position === 'defender'
      ),
    [match.teamBlue.players]
  );

  const [error, setError] = useState({ show: false, Message: '' });
  const [redTeamScore, setRedTeamScore] = useState<number | null>(
    match.teamRed.score
  );
  const [blueTeamScore, setBlueTeamScore] = useState<number | null>(
    match.teamBlue.score
  );
  const [redTeamPlayerStriker, setRedTeamPlayerStriker] = useState(
    originalStrikerInRedTeam
  );
  const [redTeamPlayerDefender, setRedTeamPlayerDefender] = useState(
    originalDefenderInRedTeam
  );
  const [blueTeamPlayerStriker, setBlueTeamPlayerStriker] = useState(
    originalStrikerInBlueTeam
  );
  const [blueTeamPlayerDefender, setBlueTeamPlayerDefender] = useState(
    originalDefenderInBlueTeam
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
      typeof redTeamPlayerStriker?.goals === 'number' ||
      typeof redTeamPlayerDefender?.goals === 'number'
    ) {
      setRedTeamScore(
        (redTeamPlayerStriker?.goals || 0) + (redTeamPlayerDefender?.goals || 0)
      );
    }
  }, [redTeamPlayerDefender, redTeamPlayerStriker]);

  useEffect(() => {
    if (
      typeof blueTeamPlayerStriker?.goals === 'number' ||
      typeof blueTeamPlayerDefender?.goals === 'number'
    ) {
      setBlueTeamScore(
        (blueTeamPlayerStriker?.goals || 0) +
          (blueTeamPlayerDefender?.goals || 0)
      );
    }
  }, [blueTeamPlayerDefender, blueTeamPlayerStriker]);

  const modificaGoalPlayer = useCallback(async (id: string, goals: number) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/player/updatePlayerGoals',
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
      const params: {
        id: string;
        redTeamScore?: number;
        blueTeamScore?: number;
        redStrikerGoals?: number;
        redDefenderGoals?: number;
        blueStrikerGoals?: number;
        blueDefenderGoals?: number;
      } = { id: match._id };

      if (redTeamScore !== match.teamRed.score) {
        params.redTeamScore = redTeamScore || 0;
      }

      if (blueTeamScore !== match.teamBlue.score) {
        params.blueTeamScore = blueTeamScore || 0;
      }

      if (
        redTeamPlayerStriker &&
        originalStrikerInRedTeam &&
        redTeamPlayerStriker.goals !== originalStrikerInRedTeam.goals
      ) {
        params.redStrikerGoals = redTeamPlayerStriker.goals || 0;
      }

      if (
        redTeamPlayerDefender &&
        originalDefenderInRedTeam &&
        redTeamPlayerDefender.goals !== originalDefenderInRedTeam.goals
      ) {
        params.redDefenderGoals = redTeamPlayerDefender.goals || 0;
      }

      if (
        blueTeamPlayerStriker &&
        originalStrikerInBlueTeam &&
        blueTeamPlayerStriker.goals !== originalStrikerInBlueTeam.goals
      ) {
        params.blueStrikerGoals = blueTeamPlayerStriker.goals || 0;
      }

      if (
        blueTeamPlayerDefender &&
        originalDefenderInBlueTeam &&
        blueTeamPlayerDefender.goals !== originalDefenderInBlueTeam.goals
      ) {
        params.blueDefenderGoals = blueTeamPlayerDefender.goals || 0;
      }

      try {
        const response = await axios.post(
          'http://localhost:3001/match/updateMatchScore',
          params
        );
        if (response.status === 200) {
          console.log('Match name updated successfully:', response.data);
          onClose(true);
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
    [
      blueTeamPlayerDefender,
      blueTeamPlayerStriker,
      blueTeamScore,
      match._id,
      match.teamBlue.score,
      match.teamRed.score,
      onClose,
      originalDefenderInRedTeam,
      originalStrikerInRedTeam,
      redTeamPlayerDefender,
      redTeamPlayerStriker,
      redTeamScore
    ]
  );

  const idsOfPlayersWithChangedGoals = useCallback(() => {
    let ids: { _id: string; goals: number }[] = [];
    if (
      redTeamPlayerStriker &&
      originalStrikerInRedTeam &&
      redTeamPlayerStriker.goals !== originalStrikerInRedTeam.goals
    ) {
      ids.push({
        _id: originalStrikerInRedTeam._id,
        goals: redTeamPlayerStriker.goals || 0
      });
    }

    if (
      redTeamPlayerDefender &&
      originalDefenderInRedTeam &&
      redTeamPlayerDefender.goals !== originalDefenderInRedTeam.goals
    ) {
      ids.push({
        _id: originalDefenderInRedTeam._id,
        goals: redTeamPlayerDefender.goals || 0
      });
    }

    if (
      blueTeamPlayerStriker &&
      originalStrikerInRedTeam &&
      blueTeamPlayerStriker.goals !== originalStrikerInRedTeam.goals
    ) {
      ids.push({
        _id: originalStrikerInRedTeam._id,
        goals: blueTeamPlayerStriker.goals || 0
      });
    }

    if (
      blueTeamPlayerDefender &&
      originalDefenderInRedTeam &&
      blueTeamPlayerDefender.goals !== originalDefenderInRedTeam.goals
    ) {
      ids.push({
        _id: originalDefenderInRedTeam._id,
        goals: blueTeamPlayerDefender.goals || 0
      });
    }
    return ids;
  }, [
    blueTeamPlayerDefender,
    blueTeamPlayerStriker,
    originalDefenderInRedTeam,
    originalStrikerInRedTeam,
    redTeamPlayerDefender,
    redTeamPlayerStriker
  ]);

  const saveScoresForMatchAndPlayers = useCallback(
    async (matchId: string) => {
      const playerIdsToModifyGoals: { _id: string; goals: number }[] =
        idsOfPlayersWithChangedGoals();

      const updatePromises = playerIdsToModifyGoals.map((p) => {
        if (p) {
          return modificaGoalPlayer(p._id, p.goals);
        }
        return Promise.resolve();
      });

      // TODO dovrebbe occuparsene il backend con un saga ma per ora faccio così
      try {
        await Promise.all(updatePromises);
        console.log('All player goals updated successfully');
        modificaPunteggioMatch(matchId);
      } catch (error) {
        setError({
          show: true,
          Message: `Error updating player goals: ${error}`
        });
      }
    },
    [idsOfPlayersWithChangedGoals, modificaGoalPlayer, modificaPunteggioMatch]
  );

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
          <Button
            variant='contained'
            onClick={() => saveScoresForMatchAndPlayers(match!._id)}
            disabled={
              match.teamRed?.score === redTeamScore &&
              match.teamBlue?.score === blueTeamScore
            }
          >
            Edit score
          </Button>
          <Button color='secondary' onClick={() => onClose(false)}>
            Back
          </Button>
        </Box>
      </div>
    </ModalStyled>
  );
};

export default ModalEditMatchScore;
