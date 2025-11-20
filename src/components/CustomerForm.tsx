import React from "react";
import "./CustomerForm.css";

export type CustomerFormData = {
  name: string;
  email: string;
};

interface Props {
  form: CustomerFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  editing?: boolean;
}

const CustomerForm: React.FC<Props> = ({ form, onChange, onSubmit, editing }) => {
  return (
    <div className="customer-form">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
        className="customer-form__input"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        className="customer-form__input"
      />

      <button className="customer-form__button" onClick={onSubmit}>
        {editing ? "Update" : "Create"}
      </button>
    </div>
  );
};

export default CustomerForm;
