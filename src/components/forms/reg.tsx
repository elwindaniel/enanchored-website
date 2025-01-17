// pages/RegistrationForm.tsx
'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import InputField from '@/components/fields/InputField';
import SelectField from '@/components/fields/SelectField';
import CheckboxField from '@/components/fields/CheckboxField';

interface FormData {
  firstName: string;
  surName: string;
  place: string;
  church: string;
  age: string;
  occupation: string;
  phoneNumber: string;
  email: string;
  hasAllergies: boolean;
  allergies: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    surName: '',
    place: '',
    church: '',
    age: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    hasAllergies: false,
    allergies: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = Object.entries(formData)
      .filter(([key]) => key !== 'allergies')
      .every(([key, value]) => value !== '' || typeof value === 'boolean');

    if (isFormValid) {
      setError(null);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setError('There was an issue submitting your registration. Please try again.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again later.');
      }
    } else {
      setError('Please fill in all required fields');
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="side-section-title">
          <h2 className="card-sub-text">Thank you for registering!</h2>
          <p className="card-sub-text">We look forward to seeing you on 26 October 2024 at Seaham.</p>
        </div>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />         
          <InputField
            id="surName"
            name="surName"
            type="text"
            label="Surname"
            value={formData.surName}
            onChange={handleChange}
            required
          />
          <InputField
            id="place"
            name="place"
            type="text"
            label="Place"
            value={formData.place}
            onChange={handleChange}
            required
          />
          <InputField
            id="church"
            name="church"
            type="text"
            label="Church"
            value={formData.church}
            onChange={handleChange}
            required
          />
          <SelectField
            id="age"
            name="age"
            label="Age"
            value={formData.age}
            onChange={handleChange}
            options={[...Array(18)].map((_, i) => ({
              value: (i + 13).toString(),
              label: (i + 13).toString(),
            }))}
            required
          />
          <SelectField
            id="occupation"
            name="occupation"
            label="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'lookingForJob', label: 'Looking for Job' },
              { value: 'working', label: 'Working' },
              { value: 'ministry', label: 'Ministry' },
            ]}
            required
          />
          <InputField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <CheckboxField
            id="hasAllergies"
            name="hasAllergies"
            label="Do you have any food allergies?"
            checked={formData.hasAllergies}
            onChange={handleChange}
          />
          {formData.hasAllergies && (
            <InputField
              id="allergies"
              name="allergies"
              type="text"
              label="Please specify your allergies"
              value={formData.allergies}
              onChange={handleChange}
              required={formData.hasAllergies}
            />
          )}
          <button type="submit" className="btn-one">
            Register
          </button>
        </form>
      )}
    </div>
  );
}
