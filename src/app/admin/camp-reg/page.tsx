"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";
import RegistrationsTable from "@/components/table/RegistrationsTable";
import apiClient from "@/utils/apiClient";
import EditRegistrationForm from "@/components/forms/EditRegistrationForm";
import NewRegistrationForm from "@/components/forms/NewRegistrationForm"; // New Registration Form Component
import styles from '@/styles/Admin.module.css';

interface Registration {
  _id: string;
  firstName: string;
  surName: string;
  place: string;
  email: string;
  phoneNumber: string;
  age: string;
  church: string;
  occupation: string;
  foodAllergy: string; // Added field for food allergy
  allergyNote?: string; // Optional field for allergy note
  photographyConsent: string;
}
interface newRegistration {
  firstName: string;
  surName: string;
  place: string;
  email: string;
  phoneNumber: string;
  age: string;
  church: string;
  occupation: string;
  foodAllergy: string; // Added field for food allergy
  allergyNote?: string; // Optional field for allergy note
  photographyConsent: string;
}

function Page() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [showNewRegistrationModal, setShowNewRegistrationModal] = useState<boolean>(false); // Track modal state for new registration

  useEffect(() => {
    getAllReg();
  }, []);

  const getAllReg = async () => {
    try {
      const response = await apiClient.get('/event/get-all-registration');
      setRegistrations(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete
  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/event/delete-registration/${id}`);
      // Update state to remove deleted registration
      getAllReg();
    } catch (err) {
      console.error("Error deleting registration:", err);
      // Handle error appropriately
    }
  };

  // Function to handle edit
  const handleEdit = (registration: Registration) => {
    setEditingRegistration(registration);
  };

  // Function to handle update after editing
  const handleUpdate = async (updatedRegistration: Registration) => {
    try {
      await apiClient.put(`/event/update-registration/${updatedRegistration._id}`, updatedRegistration);
      getAllReg();
      setEditingRegistration(null); // Close the edit form/modal
    } catch (err) {
      console.error("Error updating registration:", err);
    }
  };

  // Function to handle adding new registration
  const handleAddNewRegistration = async (newRegistration: newRegistration) => {
    try {
      await apiClient.post('/event/create-registration', newRegistration);
      getAllReg();
      setShowNewRegistrationModal(false); // Close the new registration form/modal
    } catch (err) {
      console.error("Error adding new registration:", err);
    }
  };

  // Function to cancel editing or creating
  const handleCancelEdit = () => {
    setEditingRegistration(null);
    setShowNewRegistrationModal(false); // Close new registration modal if open
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
     <MdOutlineAddCircle
        className={styles.floatingAddButton}
        onClick={() => setShowNewRegistrationModal(true)} // Show modal on click
        size={45}
      />
      <RegistrationsTable
        registrations={registrations}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Render Edit Form or Modal */}
      {editingRegistration && (
        <EditRegistrationForm
          registration={editingRegistration}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Render New Registration Form Modal */}
      {showNewRegistrationModal && (
        <NewRegistrationForm
          onSubmit={handleAddNewRegistration}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Floating Add Button */}
     
    </>
  );
}

export default Page;
