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
import { MatchType } from '../../types/MatchType';
import ModalStyled from '../../components/ModalStyled';
import { TeamType } from '../../types/TeamType';

type ModalCreateEditMatchProps = {
  show: boolean;
  onClose: (refresh?: boolean) => void;
  setMatches: React.Dispatch<React.SetStateAction<MatchType[] | null>>;
  matchToEdit?: MatchType | null;
};

const ModalCreateEditMatch: React.FC<ModalCreateEditMatchProps> = ({
  show,
  onClose,
  setMatches,
  matchToEdit = null
}) => {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState({ show: false, Message: '' });
  const [teamOptions, setTeamOptions] = useState<TeamType[]>([]);
  const [redTeam, setRedTeam] = useState<TeamType | null>(null);
  const [blueTeam, setBlueTeam] = useState<TeamType | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const resetDati = useCallback(() => {
    setName(null);
    setError({ show: false, Message: '' });
    setBlueTeam(null);
    setRedTeam(null);
    setSearchTerm('');
    setTeamOptions([]);
  }, []);

  useEffect(() => {
    if (!show) {
      resetDati();
    }
  }, [resetDati, show]);

  const aggiungiMatch = useCallback(async () => {
    try {
      const newMatch = {
        name,
        redTeam,
        blueTeam
      };
      const response = await axios.post(
        'http://localhost:3001/match/createMatch',
        newMatch
      );
      if (response.status === 200) {
        setMatches((prevmatches) =>
          prevmatches
            ? [
                ...prevmatches,
                { _id: response.data._id, ...response.data.match }
              ]
            : [response.data]
        );
        onClose(false);
      } else {
        setError({ show: true, Message: response.data.error });
        console.error('Error adding match:', 'qualcosa è andato storto');
      }
    } catch (error) {
      setError({ show: true, Message: 'Something went wrong' });
      console.error('Error adding match:', error);
    }
  }, [blueTeam, name, onClose, redTeam, setMatches]);

  const modificaMatch = useCallback(
    async (id: string, newName: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/match/updateMatchName',
          {
            id,
            name: newName
          }
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
    [onClose]
  );

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/team/getAllEligibleTeamsByName',
          {
            params: { term: searchTerm, excludeName: redTeam?.name }
          }
        );
        setTeamOptions(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    if (searchTerm) {
      fetchPlayers();
    }
  }, [searchTerm, name, redTeam?.name]);

  return (
    <ModalStyled
      title={matchToEdit ? 'Edit match' : 'Add new match'}
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
            <Autocomplete
              // disabled
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              filterOptions={(x) => x}
              options={teamOptions}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={redTeam}
              noOptionsText='No teams'
              onChange={(event: any, newValue: TeamType | null) => {
                setTeamOptions(
                  newValue ? [newValue, ...teamOptions] : teamOptions
                );
                setRedTeam(newValue);
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
                    !redTeam || redTeam.name === '' || redTeam.name === null
                  }
                  {...params}
                  label='Red Team'
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
              // disabled
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              clearOnEscape
              filterOptions={(x) => x}
              options={teamOptions}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={blueTeam}
              noOptionsText='No teams'
              onChange={(event: any, newValue: TeamType | null) => {
                setTeamOptions(
                  newValue ? [newValue, ...teamOptions] : teamOptions
                );
                setBlueTeam(newValue);
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
                    !blueTeam || blueTeam.name === '' || blueTeam.name === null
                  }
                  {...params}
                  label='Blue team'
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
              matchToEdit
                ? () => modificaMatch(matchToEdit!._id, name + '')
                : () => aggiungiMatch()
            }
            disabled={redTeam?.name === '' || blueTeam?.name === null}
          >
            {matchToEdit ? 'Edit' : 'Add'}
          </Button>
          {/* <Button color='secondary' onClick={handleCloseModaleCreMatch}>
              Cancel
            </Button> */}
        </Box>
      </div>
    </ModalStyled>
  );
};

export default ModalCreateEditMatch;
