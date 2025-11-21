import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Box from '@mui/material/Box';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Customer = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const ManageCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const loadCustomers = async () => {
    const res = await api.get<Customer[]>("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const openCreateDialog = () => {
    setEditingId(null);
    setForm({ name: "", email: "" });
    setOpen(true);
  };

  const openEditDialog = (c: Customer) => {
    setEditingId(c.id);
    setForm({ name: c.name, email: c.email });
    setOpen(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await api.put(`/customers/${editingId}`, form);
    } else {
      await api.post("/customers", form);
    }

    setOpen(false);
    loadCustomers();
  };

  const deleteCustomer = async (id: number) => {
    await api.delete(`/customers/${id}`);
    loadCustomers();
  };

  return (
    <div style={{ padding: 30 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Manage Customers</Typography>
        <Button variant="contained" onClick={openCreateDialog}>
          Add Customer
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Created</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => openEditDialog(c)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteCustomer(c.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Create/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingId ? "Edit Customer" : "New Customer"}
        </DialogTitle>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Username" name="name" value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} fullWidth variant="outlined" />
          <TextField id="filled-basic" label="Email" name="email" value={form.email}   onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth variant="outlined" />
        </Box>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageCustomers;
