import React, { useCallback, useEffect, useState } from 'react';
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
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { PlayerType } from '../../../types/PlayerType';
import axios from 'axios';
import BestPlayerTableRow from './PlayerTableRow';
import { visuallyHidden } from '@mui/utils';

const BestPlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerType[] | null>(null);

  const getPlayers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/player/getAllPlayers'
      );
      if (response.status !== 200) {
        console.error('Error fetching players:', 'qualcosa è andato storto');
        return null;
      }
      // return response.data.players;
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      return null;
    }
  };

  const ottieniPlayers = useCallback(async () => {
    const data = await getPlayers();
    if (data) {
      setPlayers(data);
    }
  }, []);

  useEffect(() => {
    if (!players) {
      ottieniPlayers();
    }
  }, [players, ottieniPlayers]);

  interface HeadCell {
    disablePadding: boolean;
    id: keyof PlayerType;
    label: string;
    numeric: boolean;
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof PlayerType;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name'
    },
    {
      id: 'goals',
      numeric: true,
      disablePadding: false,
      label: 'Goals'
    },
    {
      id: 'blocks',
      numeric: true,
      disablePadding: false,
      label: 'blocks'
    }
  ];

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: string,
    orderBy: string
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy as Key)
      : (a, b) => -descendingComparator(a, b, orderBy as Key);
  }

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof PlayerType>('goals');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (players?.length || 0))
      : 0;

  const visibleRows = React.useMemo(
    () =>
      players
        ?.sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [getComparator, order, orderBy, page, players, rowsPerPage]
  );

  const createSortHandler =
    (property: keyof PlayerType) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <div className='manageTable-div'>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className='header-container'>
            <h1 className='header-title' style={{ marginBottom: '40px' }}>
              Players leaderboards
            </h1>
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: '40px' }}>
        {players ? (
          <div>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={'medium'}
              >
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component='span' sx={visuallyHidden}>
                              {order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows?.map((row: any, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row._id}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align='right'>{row.goals}</TableCell>
                        <TableCell align='right'>{row.blocks}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={players.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <CircularProgress sx={{ marginTop: '40' }} size={40} />
        )}
      </div>
    </div>
  );
};

export default BestPlayers;
