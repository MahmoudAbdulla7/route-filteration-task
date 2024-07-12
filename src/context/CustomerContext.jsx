import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:3000/customers');
        const transactionsResponse = await axios.get('http://localhost:3000/transactions');

        setCustomers(customersResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
      let mergedData = {};

      customers.forEach((customer) => {
        mergedData[customer.id] = {
          id: customer.id,
          name: customer.name,
          transactions: [],
        };
      });

      transactions.forEach((transaction) => {
        if (mergedData[transaction.customer_id]) {
          mergedData[transaction.customer_id].transactions.push({
            id: transaction.id,
            date: transaction.date,
            amount: transaction.amount,
          });
        }
      });

      const mergedArray = Object.values(mergedData);
      const mergedArrayWithTotalAmount = mergedArray.map((customer) => ({
        ...customer,
        totalAmount: customer.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
      }));

      const mergedArrayWithDate = mergedArrayWithTotalAmount.map((customer) => ({
        ...customer,
        date: customer.transactions[customer.transactions.length - 1]?.date || 'No transactions',
      }));

      setData(mergedArrayWithDate);
    
  }, [customers, transactions]);

  return (
    <CustomerContext.Provider value={{ customers, transactions, data }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
