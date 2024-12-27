import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, FormControl, TextField } from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';
import axios from 'axios';
import ModalStyled from '../../../components/ModalStyled';

type ModalPlayerProps = {
  show: boolean;
  onClose: (refresh?: boolean) => void;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerType[] | null>>;
  playerToEdit?: PlayerType | null;
};

const ModalPlayer: React.FC<ModalPlayerProps> = ({
  show,
  onClose,
  setPlayers,
  playerToEdit = null
}) => {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState({ show: false, Message: '' });

  const resetDati = useCallback(() => {
    setName(null);
    setError({ show: false, Message: '' });
  }, []);

  useEffect(() => {
    if (!show) {
      resetDati();
    }
  }, [resetDati, show]);

  const aggiungiPlayer = useCallback(async () => {
    try {
      const newPlayer = {
        name
      };
      const response = await axios.post(
        'http://localhost:3001/player/createPlayer',
        newPlayer
      );
      if (response.status === 200) {
        debugger;
        setPlayers((prevPlayers) =>
          prevPlayers ? [...prevPlayers, response.data] : [response.data]
        );
        onClose(false);
      } else {
        setError({ show: true, Message: response.data.error });
        console.error('Error adding player:', 'qualcosa è andato storto');
      }
    } catch (error) {
      setError({ show: true, Message: 'Something went wrong' });
      console.error('Error adding player:', error);
    }
  }, [name, onClose, setPlayers]);

  const modificaPlayer = useCallback(
    async (id: string, newName: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/player/updatePlayerName',
          {
            id,
            name: newName
          }
        );
        if (response.status === 200) {
          console.log('Player name updated successfully:', response.data);
          onClose(true);
        } else {
          console.error(
            'Error updating player name:',
            'qualcosa è andato storto'
          );
        }
      } catch (error) {
        console.error('Error updating player name:', error);
      }
    },
    [onClose]
  );

  return (
    <ModalStyled
      title={playerToEdit ? "Edit player's name" : 'Add new player'}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
              value={name || name === '' ? name : playerToEdit?.name}
              error={name === '' || name === null}
              helperText={(name === '' || name === null) && 'Required'}
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
              playerToEdit
                ? () => modificaPlayer(playerToEdit!._id, name + '')
                : () => aggiungiPlayer()
            }
            disabled={name === '' || name === null}
          >
            {playerToEdit ? 'Edit' : 'Add'}
          </Button>
          {/* <Button color='secondary' onClick={handleCloseModaleCrePlayer}>
              Cancel
            </Button> */}
        </Box>
      </div>
    </ModalStyled>
  );
};

export default ModalPlayer;
