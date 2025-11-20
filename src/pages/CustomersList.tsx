import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./CustomersList.css";

type Customer = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    const res = await api.get<Customer[]>("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="customers-list">
      <h1 className="customers-list__title">All Customers</h1>

      <table className="customers-list__table">
        <thead>
          <tr>
            <th className="customers-list__th">Name</th>
            <th className="customers-list__th">Email</th>
            <th className="customers-list__th">Created</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="customers-list__row">
              <td className="customers-list__td">{c.name}</td>
              <td className="customers-list__td">{c.email}</td>
              <td className="customers-list__td">{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
