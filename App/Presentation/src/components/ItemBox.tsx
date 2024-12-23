import React from 'react';
import { Box, BoxProps } from '@mui/material';

function ItemBox(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800'
          })
        }),
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    />
  );
}
export default ItemBox;
