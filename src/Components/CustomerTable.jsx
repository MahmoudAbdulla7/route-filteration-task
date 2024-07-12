import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import NoData from "./NoData";

const CustomerTable = () => {
  const { data: userData } = useContext(CustomerContext);
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  useEffect(() => {
    let filteredData = userData.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const amountMatch = `${user.totalAmount}`.startsWith(amountFilter);

      if (nameFilter && amountFilter) {
        return nameMatch && amountMatch;
      }

      if (nameFilter && !amountFilter) {
        return nameMatch;
      }

      if (!nameFilter && amountFilter) {
        return amountMatch;
      }
      return 1;
    });

    setFilteredUsers(filteredData);
  }, [userData, nameFilter, amountFilter]);

  const handleNameFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleAmountFilter = (e) => {
    setAmountFilter(e.target.value);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ color: "#FF7D29", marginY: "1rem" }}>
          Customers Transactions
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box>
              <TextField
                sx={{ bgcolor: "#FEFFD2" }}
                label="Search by Name"
                value={nameFilter}
                onChange={handleNameFilter}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                sx={{ bgcolor: "#FEFFD2" }}
                label="Search by Amount"
                type="number"
                value={amountFilter}
                onChange={handleAmountFilter}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        {filteredUsers.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ bgcolor: "#FEFFD2" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center", color: "#FF7D29" }}>
                    Customer ID
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", color: "#FF7D29" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", color: "#FF7D29" }}>
                    Transaction Amount
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", color: "#FF7D29" }}>
                    Transaction Date
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", color: "#FF7D29" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((customer, idx) => (
                  <TableRow key={customer.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {customer.id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {customer.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }} key={customer.id}>
                      {customer.totalAmount}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }} key={idx}>
                      {customer.date}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Link
                        to={`user/${customer.id}`}
                        sx={{ color: "#ffcdd2" }}
                      >
                        <svg
                          className="chartIcon"
                          width="15%"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#FF7D29"
                            d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"
                          />
                        </svg>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "40%" }}>
              <NoData />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomerTable;
