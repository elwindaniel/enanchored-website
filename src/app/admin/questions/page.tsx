// /app/admin/questions/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/form/AskQuestionsAdmin.module.css';

interface AskQuestion {
  _id: string;
  name?: string;
  email?: string;
  question: string;
  createdAt: string;
}

const AdminQuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<AskQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/askquestions', {
        method: 'GET',
        cache: 'no-store', // Ensure fresh data
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch questions.');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return <div className={styles.adminContainer}><p>Loading questions...</p></div>;
  }

  if (error) {
    return <div className={styles.adminContainer}><p className={styles.errorMessage}>{error}</p></div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h2>Submitted Questions</h2>
      {questions.length === 0 ? (
        <p>No questions have been submitted yet.</p>
      ) : (
        <ul className={styles.questionsList}>
          {questions.map((q) => (
            <li key={q._id} className={styles.questionItem}>
              <p><strong>Question:</strong> {q.question}</p>
              {q.name && <p><strong>Name:</strong> {q.name}</p>}
              {q.email && <p><strong>Email:</strong> {q.email}</p>}
              <p><em>Submitted on: {new Date(q.createdAt).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminQuestionsPage;
