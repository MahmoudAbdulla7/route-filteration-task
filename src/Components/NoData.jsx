import React from 'react';
import { Box } from '@mui/material';
import noData from '../assets/No data-rafiki.png';

export default function NoData() {
  return (
    <Box>
      <Box
        component="img"
        src={noData}
        alt="No data"
        sx={{
          maxWidth: '100%',
        }}
      />
    </Box>
  );
}
