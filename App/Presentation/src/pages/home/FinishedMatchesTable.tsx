import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { MatchType } from '../../types/MatchType';
// import { MoreVert } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

type FinishedMatchesTableProps = {
  isSomeCompletedMatches: boolean;
  matches: MatchType[];
  setMatchToDelete: (match: MatchType) => void;
};

const FinishedMatchesTable: React.FC<FinishedMatchesTableProps> = ({
  isSomeCompletedMatches,
  matches,
  setMatchToDelete
}) => {
  return (
    <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow>
          <TableCell>Team Red</TableCell>
          <TableCell>Team Blue</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Date</TableCell>
          {/* <TableCell>Winner</TableCell> */}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      {isSomeCompletedMatches && (
        <TableBody>
          {matches.map(
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
                  {/* <TableCell>{match.winner}</TableCell> */}
                  <TableCell align='right'>
                    <IconButton onClick={() => setMatchToDelete(match)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default FinishedMatchesTable;
