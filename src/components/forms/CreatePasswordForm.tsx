// app/create-password/CreatePasswordForm.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import styles from '@/styles/form/EditRegistrationForm.module.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const CreatePasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to set password');
      } else {
        setMessage('Password set successfully. You can now log in.');
        // Optionally redirect to login page after a delay
        setTimeout(() => router.push('/login'), 3000);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${montserrat.className}`}>
      <div className={styles.modalContent}>
        <h1>Create Password</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message ? (
          <p>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                Create Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePasswordForm;
