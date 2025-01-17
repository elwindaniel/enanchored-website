// pages/ContactForm.tsx
'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import InputField from '@/components/fields/InputField';
import TextareaField from '@/components/fields/TextareaField';

interface FormData {
  name: string;
  place: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    place: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every(value => value !== '');

    if (isFormValid) {
      setError(null);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setError('There was an issue submitting your message. Please try again.');
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
          <h2 className="card-sub-text">Thank you for contacting us!</h2>
          <p className="card-sub-text">We will get back to you shortly.</p>
        </div>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <InputField
            id="name"
            name="name"
            type="text"
            label="Name"
            value={formData.name}
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
            id="place"
            name="place"
            type="text"
            label="Place"
            value={formData.place}
            onChange={handleChange}
            required
          />

          <TextareaField
            id="message"
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-one">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
