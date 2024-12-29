import React, { useCallback } from 'react';
import {
  Box,
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

import { visuallyHidden } from '@mui/utils';
import TeamTableRow from './TeamTableRow';

interface HeadCell {
  disablePadding: boolean;
  id: keyof { name: string; wins: number };
  label: string;
  numeric: boolean;
}

type SortableTableProps = {
  headCells: HeadCell[];
  rows: any[];
};

const SortableTable: React.FC<SortableTableProps> = ({ headCells, rows }) => {
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

  const getComparator = useCallback(
    <Key extends keyof any>(
      order: string,
      orderBy: string
    ): ((
      a: { [key in Key]: number | string },
      b: { [key in Key]: number | string }
    ) => number) => {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy as Key)
        : (a, b) => -descendingComparator(a, b, orderBy as Key);
    },
    []
  );

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] =
    React.useState<keyof { name: string; wins: number }>('wins');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof { name: string; wins: number }
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (rows.length || 0)) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows
        ?.sort(getComparator(order, orderBy as string))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [getComparator, order, orderBy, page, rows, rowsPerPage]
  );

  const createSortHandler =
    (property: keyof { name: string; wins: number }) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableContainer component={Paper} style={{ height: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Table aria-labelledby='tableTitle' size={'medium'}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
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
          {visibleRows?.map((row: any, index) => (
            <TeamTableRow key={index} team={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {(!rows || rows.length === 0) && <h3>There are no teams yet ...</h3>}
    </TableContainer>
  );
};
export default SortableTable;
