import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography
} from "@mui/material";

type Customer = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get("/customers").then((res) => setCustomers(res.data));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        All Customers
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Created</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomersList;
