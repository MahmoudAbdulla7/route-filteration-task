import { Box, Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerTable from './Components/CustomerTable';
import TransactionChart from './Components/TransactionChart';
import CustomerProvider from './context/CustomerContext';

const App = () => {
  return (
    <CustomerProvider>

    <Box sx={{bgcolor:"#FFEEA9"}}>
    <Container >
        <Routes>
          <Route path="/" element={<CustomerTable />} />

          <Route path="/user/:transaction_id" element={<TransactionChart />} />
        </Routes>
      </Container>
    </Box>

    </CustomerProvider>
  );
};

export default App;
