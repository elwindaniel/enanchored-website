'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/form/AskQuestionsForm.module.css';

interface FormData {
  name: string;
  email: string;
  question: string;
}

const initialState: FormData = {
  name: '',
  email: '',
  question: '',
};

const AskQuestionsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Send form data to the API
    try {
      const response = await fetch('/api/askquestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData(initialState);
      } else {
        setSubmissionStatus(`error: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error: Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Ask a Question</h2>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>Your question has been submitted successfully!</p>
      )}
      {submissionStatus && submissionStatus.startsWith('error') && (
        <p className={styles.errorMessage}>{submissionStatus}</p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Name (Optional) */}
        <label>
          Name (Optional):
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
          />
        </label>

        {/* Email (Optional) */}
        <label>
          Email (Optional):
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
          />
        </label>

        {/* Question (Required) */}
        <label>
          * Your Question
          <textarea
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Type your question here..."
            required
            rows={5}
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AskQuestionsForm;
