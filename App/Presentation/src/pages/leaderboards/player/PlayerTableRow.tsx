import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';

type PlayerTableRowProps = {
  player: PlayerType;
};

const PlayerTableRow: React.FC<PlayerTableRowProps> = ({ player }) => {
  return (
    <>
      <TableRow
        key={player._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          {player.name}
        </TableCell>
        <TableCell align='right'>{player.goals}</TableCell>
        <TableCell align='right'>{player.blocks}</TableCell>
      </TableRow>
    </>
  );
};

export default PlayerTableRow;
