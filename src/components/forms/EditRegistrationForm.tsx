import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'; // Import the 'x' icon
import styles from '@/styles/form/EditRegistrationForm.module.css';

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
  photographyConsent: string; // Added field for photography consent
  // Include other fields if any
}

interface EditRegistrationFormProps {
  registration: Registration;
  onUpdate: (updatedRegistration: Registration) => void;
  onCancel: () => void;
}

const EditRegistrationForm: React.FC<EditRegistrationFormProps> = ({
  registration,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Registration>(registration);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Icon */}
        <AiFillCloseCircle
          className={styles.closeIcon}
          onClick={onCancel}
          aria-label="Close"
          size={50}
        />
        <h2>Edit Registration</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            First Name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Surname:
            <input
              name="surName"
              value={formData.surName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Place:
            <input
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
            />
          </label>
          <label>
            Church:
            <input
              name="church"
              value={formData.church}
              onChange={handleChange}
            />
          </label>
          <label>
            Occupation:
            <input
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />
          </label>

          {/* Food Allergy Section */}
          <label>
            Food Allergy:
            <select
              name="foodAllergy"
              value={formData.foodAllergy}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {formData.foodAllergy === 'Yes' && (
            <label>
              Allergy Note:
              <input
                name="allergyNote"
                value={formData.allergyNote || ''}
                onChange={handleChange}
                placeholder="Please specify your food allergies"
                required
              />
            </label>
          )}

          {/* Photography Consent Section */}
          <label>
            Photography Consent:
            <select
              name="photographyConsent"
              value={formData.photographyConsent}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {formData.photographyConsent === 'Yes' && (
            <p className={styles.photographyNote}>
              I hereby grant the Enanchored permission to use my likeness in a photograph,
              video, or other digital media (“photo”) in any and all of its publications,
              including web-based publications.
            </p>
          )}

          {/* Add other fields as needed */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRegistrationForm;
