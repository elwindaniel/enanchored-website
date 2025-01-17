"use client";
import React, { useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import styles from "@/styles/Admin.module.css";
import NewUserForm from "@/components/forms/AddUserForm";
import axios from "axios";

interface User {
    email: string;
    name: string;
    role: string;
}

export default function Page() {
    const [showNewRegistrationModal, setShowNewRegistrationModal] = useState<boolean>(false);

    const handleAddNewRegistration = async (newRegistration: User) => {
        try {
            // Uncomment and replace apiClient logic with actual implementation
             await axios.post('/api/user', newRegistration);
            // getAllReg(); // Call the function to get all registrations if needed
            // setShowNewRegistrationModal(false); // Close the new registration form/modal
        } catch (err) {
            console.error("Error adding new registration:", err);
        }
    };

    // Function to cancel editing or creating
    const handleCancelEdit = () => {
        setShowNewRegistrationModal(false); // Close new registration modal if open
    };

    return (
        <div>
            <MdOutlineAddCircle
                className={styles.floatingAddButton}
                onClick={() => setShowNewRegistrationModal(true)} // Show modal on click
                size={45}
            />
            {showNewRegistrationModal && (
                <NewUserForm
                    onSubmit={handleAddNewRegistration}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}
