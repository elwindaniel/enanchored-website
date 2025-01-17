'use client'
import React, { useState } from 'react';
import styles from '@/styles/form/EditRegistrationForm.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';

interface User {
  email: string;
  name: string;
  role: string;
  password: string;
}

interface NewUserFormProps {
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<User>({
    email: '',
    name: '',
    role: '',
    password:'enanchored'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span>
          <AiFillCloseCircle
            className={styles.closeIcon}
            onClick={onCancel}
            aria-label="Close"
            size={50}
          />
        </span>
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            name:
            <input
              name="name"
              type="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="coordinator">Coordinator</option>
              <option value="notVerified">Not Verified</option>
            </select>
          </label>
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
