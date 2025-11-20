import React, { useEffect, useState } from "react";
import api from "../api/axios";
import CustomerForm from "../components/CustomerForm";
import "./ManageCustomers.css";

type Customer = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const ManageCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadCustomers = async () => {
    const res = await api.get<Customer[]>("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createCustomer = async () => {
    await api.post("/customers", form);
    setForm({ name: "", email: "" });
    loadCustomers();
  };

  const updateCustomer = async () => {
    if (!editingId) return;
    await api.put(`/customers/${editingId}`, form);
    setEditingId(null);
    setForm({ name: "", email: "" });
    loadCustomers();
  };

  const deleteCustomer = async (id: number) => {
    await api.delete(`/customers/${id}`);
    loadCustomers();
  };

  const startEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({ name: customer.name, email: customer.email });
  };

  return (
    <div className="manage-customers">
      <h1 className="manage-customers__title">Manage Customers</h1>

      <CustomerForm
        form={form}
        onChange={onChange}
        onSubmit={editingId ? updateCustomer : createCustomer}
        editing={!!editingId}
      />

      <table className="manage-customers__table">
        <thead>
          <tr>
            <th className="manage-customers__th">Name</th>
            <th className="manage-customers__th">Email</th>
            <th className="manage-customers__th">Created</th>
            <th className="manage-customers__th">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="manage-customers__row">
              <td className="manage-customers__td">{c.name}</td>
              <td className="manage-customers__td">{c.email}</td>
              <td className="manage-customers__td">{new Date(c.createdAt).toLocaleString()}</td>
              <td className="manage-customers__td">
                <button className="manage-customers__edit" onClick={() => startEdit(c)}>
                  Edit
                </button>
                <button className="manage-customers__delete" onClick={() => deleteCustomer(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomers;
