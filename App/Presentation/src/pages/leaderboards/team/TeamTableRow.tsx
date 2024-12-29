import React from 'react';
import { TableCell, TableRow } from '@mui/material';

type TeamTableRowProps = {
  team: { name: string; wins: number };
};

const TeamTableRow: React.FC<TeamTableRowProps> = ({ team }) => {
  return (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        {team.name}
      </TableCell>
      <TableCell align='right'>{team.wins}</TableCell>
    </TableRow>
  );
};

export default TeamTableRow;
