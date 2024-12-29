import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField
} from '@mui/material';
import axios from 'axios';
import ModalStyled from '../../../components/ModalStyled';
import { PlayerInTeamType, TeamType } from '../../../types/TeamType';

type ModalCreateEditTeamProps = {
  show: boolean;
  onClose: (refresh?: boolean) => void;
  setTeams: React.Dispatch<React.SetStateAction<TeamType[] | null>>;
  teamToEdit?: (TeamType & { action: 'editName' | 'editMembers' }) | null;
};

const ModalCreateEditTeam: React.FC<ModalCreateEditTeamProps> = ({
  show,
  onClose,
  setTeams,
  teamToEdit = null
}) => {
  const [name, setName] = useState<string | null>(null);
  const [strikerPlayer, setStrikerPlayer] = useState<PlayerInTeamType | null>(
    null
  );
  const [defenderPlayer, setDefenderPlayer] = useState<PlayerInTeamType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [playerOptions, setPlayerOptions] = useState<
    readonly PlayerInTeamType[]
  >([]);
  const [error, setError] = useState({ show: false, Message: '' });

  const [strikerEffectExecuted, setStrikerEffectExecuted] = useState(false);
  const [defenderEffectExecuted, setDefenderEffectExecuted] = useState(false);

  const resetDati = useCallback(() => {
    setName(null);
    setStrikerPlayer(null);
    setDefenderPlayer(null);
    setError({ show: false, Message: '' });
    setSearchTerm('');
    setPlayerOptions([]);
    setStrikerEffectExecuted(false);
    setDefenderEffectExecuted(false);
  }, []);

  useEffect(() => {
    if (!strikerEffectExecuted && !strikerPlayer && teamToEdit) {
      setStrikerPlayer(
        teamToEdit.players.find((x) => x.position === 'striker') || null
      );
      setStrikerEffectExecuted(true);
    }
  }, [strikerEffectExecuted, strikerPlayer, teamToEdit]);

  useEffect(() => {
    if (!defenderEffectExecuted && !defenderPlayer && teamToEdit) {
      setDefenderPlayer(
        teamToEdit.players.find((x) => x.position === 'defender') || null
      );
      setDefenderEffectExecuted(true);
    }
  }, [defenderEffectExecuted, defenderPlayer, teamToEdit]);

  useEffect(() => {
    if (!show) {
      resetDati();
    }
  }, [resetDati, show, teamToEdit]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/player/getAllEligiblePlayersByName',
          {
            params: { term: searchTerm, excludeName: strikerPlayer?.name }
          }
        );
        setPlayerOptions(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [searchTerm, name, strikerPlayer?.name]);

  const aggiungiTeam = useCallback(async () => {
    try {
      const newTeam = {
        name,
        strikerPlayer,
        defenderPlayer
      };
      const response = await axios.post(
        'http://localhost:3001/team/createTeam',
        newTeam
      );
      if (response.status === 200) {
        setTeams((preTeams) =>
          preTeams ? [...preTeams, response.data] : [response.data]
        );
        onClose(false);
      } else {
        setError({ show: true, Message: response.data.error });
        console.error('Error adding team:', 'qualcosa è andato storto');
      }
    } catch (error) {
      setError({ show: true, Message: 'Something went wrong' });
      console.error('Error adding team:', error);
    }
  }, [defenderPlayer, name, onClose, setTeams, strikerPlayer]);

  const modificaTeam = useCallback(
    async (
      id: string,
      newName: string,
      newStriker: PlayerInTeamType,
      newDefender: PlayerInTeamType
    ) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/team/updateTeam',
          {
            id,
            name: newName,
            strikerPlayer: newStriker,
            defenderPlayer: newDefender
          }
        );
        if (response.status === 200) {
          console.log('Team name updated successfully:', response.data);
          onClose(true);
        } else {
          console.error(
            'Error updating team name:',
            'qualcosa è andato storto'
          );
        }
      } catch (error) {
        console.error('Error updating team name:', error);
      }
    },
    [onClose]
  );

  return (
    <ModalStyled
      title={teamToEdit ? 'Edit team' : 'Add new team'}
      show={show}
      onClose={onClose}
    >
      <div>
        <Box
          component='form'
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete='off'
        >
          {error.show && (
            <Alert sx={{ mb: 3 }} severity='error'>
              {error.Message}
            </Alert>
          )}
          <FormControl defaultValue='' required>
            <TextField
              id='name'
              label='Name'
              required
              autoFocus
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
              value={name || name === '' ? name : teamToEdit?.name}
              error={
                teamToEdit && teamToEdit.action === 'editMembers'
                  ? false
                  : name === '' || name === null
              }
              disabled={
                teamToEdit && teamToEdit.action === 'editMembers' ? true : false
              }
              // helperText={(name === '' || name === null) && 'Required'}
            />
          </FormControl>
          <br />
          <FormControl defaultValue='' required>
            <Autocomplete
              disabled={
                teamToEdit && teamToEdit.action === 'editName' ? true : false
              }
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              filterOptions={(x) => x}
              options={playerOptions}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={strikerPlayer}
              noOptionsText='No players'
              onChange={(event: any, newValue: PlayerInTeamType | null) => {
                setPlayerOptions(
                  newValue ? [newValue, ...playerOptions] : playerOptions
                );
                setStrikerPlayer(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
              }}
              onBlur={() => {
                setSearchTerm('');
              }}
              renderInput={(params) => (
                <TextField
                  required
                  error={
                    !strikerPlayer ||
                    strikerPlayer.name === '' ||
                    strikerPlayer.name === null
                  }
                  {...params}
                  label='Striker player'
                  fullWidth
                />
              )}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component='span'
                      sx={{
                        fontWeight: 'regular'
                      }}
                    >
                      {typeof option !== 'string' && option.name}
                    </Box>
                  </li>
                );
              }}
              // renderOption={(props, option) => {
              // TODO se ho tempo faccio l'highlight se no rimane così
              // const { key, ...optionProps } = props;
              // const matches =
              //   option.name.toLocaleLowerCase().match(searchTerm) || [];

              // const parts = parse(
              //   option.name,
              //   matches.map((match: any) => [
              //     match.offset,
              //     match.offset + match.length
              //   ])
              // );
              // return (
              //   <li key={key} {...optionProps}>
              //     {parts.map((part: any, index: number) => (
              //       <Box
              //         key={index}
              //         component='span'
              //         sx={{
              //           fontWeight: 'regular'
              //         }}
              //       >
              //         {option.name}
              //       </Box>
              //     ))}
              //   </li>
              // );
              // }}
            />
          </FormControl>
          <br />
          <FormControl defaultValue='' required>
            <Autocomplete
              disabled={
                teamToEdit && teamToEdit.action === 'editName' ? true : false
              }
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              clearOnEscape
              filterOptions={(x) => x}
              options={playerOptions}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={defenderPlayer}
              noOptionsText='No players'
              onChange={(event: any, newValue: PlayerInTeamType | null) => {
                setPlayerOptions(
                  newValue ? [newValue, ...playerOptions] : playerOptions
                );
                setDefenderPlayer(newValue);
              }}
              onBlur={() => {
                setSearchTerm('');
              }}
              onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  required
                  error={
                    !defenderPlayer ||
                    defenderPlayer.name === '' ||
                    defenderPlayer.name === null
                  }
                  {...params}
                  label='Defender player'
                  fullWidth
                />
              )}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component='span'
                      sx={{
                        fontWeight: 'regular'
                      }}
                    >
                      {option.name}
                    </Box>
                  </li>
                );
              }}
            />
          </FormControl>
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
            onClick={
              teamToEdit
                ? () =>
                    modificaTeam(
                      teamToEdit!._id,
                      name || name === '' ? name : teamToEdit?.name,
                      strikerPlayer!,
                      defenderPlayer!
                    )
                : () => aggiungiTeam()
            }
            disabled={
              teamToEdit
                ? (teamToEdit?.action === 'editName' &&
                    (name === '' || name === null)) ||
                  (teamToEdit?.action === 'editMembers' &&
                    (!strikerPlayer ||
                      strikerPlayer?.name === '' ||
                      !defenderPlayer ||
                      defenderPlayer?.name === ''))
                : !strikerPlayer ||
                  strikerPlayer?.name === '' ||
                  !defenderPlayer ||
                  defenderPlayer?.name === ''
            }
          >
            {teamToEdit ? 'Edit' : 'Add'}
          </Button>
          {/* <Button color='secondary' onClick={handleCloseModaleCreTeam}>
              Back
            </Button> */}
        </Box>
      </div>
    </ModalStyled>
  );
};

export default ModalCreateEditTeam;
